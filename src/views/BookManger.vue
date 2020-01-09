<template>
    <div>
        <el-dialog
                title="提示"
                :visible.sync="dialogVisible"
                width="30%"
                :before-close="handleClose">
            <span>这是一段信息</span>
            <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
        </el-dialog>
        <el-dialog title="专辑详情" :visible.sync="isShowDetailDialog">
            <div v-if="currentAlbum" class="detail-block">
                <div class="detail-property-block">
                    <img :src="currentAlbum.cover">
                </div>
                <div class="detail-property-block">
                    <span>相册id</span>
                    <el-input v-model="currentAlbum['album_id']" placeholder="请输入内容" :disabled="!editable"></el-input>
                </div>
                <div class="detail-property-block">
                    <span>专辑名称</span>
                    <el-input v-model="currentAlbum['album_name']" placeholder="请输入内容" :disabled="!editable"></el-input>
                </div>
                <div class="detail-property-block">
                    <span>价格</span>
                    <el-input v-model="currentAlbum['price']" placeholder="请输入内容" :disabled="!editable"></el-input>
                </div>
                <div class="detail-property-block">
                    <span>歌手名称</span>
                    <el-input v-model="currentAlbum['singers']" placeholder="请输入内容" disabled="false"></el-input>
                </div>
            </div>

            <div slot="footer" class="dialog-footer">
                <el-button @click="isShowDetailDialog = false" v-if="editable">取 消</el-button>
                <el-button type="primary" @click="showConfirm">确 定</el-button>
            </div>
        </el-dialog>


        <h1>Book Manager</h1>
        <el-form :inline="true" :model="book" class="demo-form-inline">
            <el-form-item label="专辑名称">
                <el-input v-model="currentAlbum['album_name']" placeholder="请输入书名"></el-input>
            </el-form-item>
            <el-form-item label="专辑价格">
                <el-input v-model.number="currentAlbum['price']" type="number" placeholder="请输入价格"></el-input>
            </el-form-item>
            <el-form-item label="发布时间">
                <el-date-picker
                        v-model="date"
                        type="date"
                        placeholder="选择日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="addAlbum">添加专辑</el-button>
            </el-form-item>
        </el-form>

        <el-table
                :data="albums"
                style="width: 80%" v-if="albums.length">
            <el-table-column
                    prop="_id"
                    label="Id"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="album_id"
                    label="album_id"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="album_name"
                    label="专辑名"
                    width="300">
            </el-table-column>
            <el-table-column
                    prop="price"
                    label="价格">
            </el-table-column>
            <el-table-column
                    prop="singer"
                    label="歌手名"
                    >
            </el-table-column>
            <el-table-column
                    fixed="right"
                    label="操作"
                    width="100">
                <template slot-scope="albumItem">
                    <el-button @click="showAlbumDialog(albumItem.row)" type="text" size="small">详细内容</el-button>
                    <el-button @click="editAlbum(albumItem.row)" type="text" size="small">编辑</el-button>
<!--                    <el-button @click="dialogVisible=true" type="text" size="small">追加歌手</el-button>-->
                    <el-button @click="deleteAlbum(albumItem.row)" type="text" size="small">删除</el-button>
                </template>
            </el-table-column>

        </el-table>
<!--        <h2>总价格： {{priceTotal}}</h2>-->

    </div>
</template>

<script>
    // import _ from 'lodash'
    export default {
        name: "BookManger",
        data(){
            return {
                maxId:2,
                book:{name:'',price:''},
                dialogVisible:false,
                books: [],
                albums: [],
                // baseUrl: 'http://39.98.54.111:3000/books',
                baseUrl: 'http://localhost:3000/albums',
                isShowDetailDialog: false,
                currentAlbum: null,
                editable: true,
                type: 'preview',
                date: null
            }
        },
        created() {
            this.initCurrentAlbum();

            fetch(this.baseUrl, {type: 'GET'}).then(res => {
                return res.json();
            }).then(json => {
                this.albums = json;
                console.log(json);
                return json;
            }).catch(err => {
                alert(err);
            })
        },
        methods:{
            showAlbumDialog(album) {
                this.currentAlbum = album;
                this.isShowDetailDialog = true;
                this.editable = false;
                this.type = "preview";
            },
            initCurrentAlbum() {
                this.currentAlbum = {
                    album_id: "",
                    album_name: "",
                    public_time: "",
                    week: 0,
                    price: 0,
                    cover: "",
                    singers: []
                }
            },
            editAlbum(album) {
                this.currentAlbum = album;
                this.isShowDetailDialog = true;
                this.editable = true;
                this.type = "edit";
            },
            showConfirm() {
                if (this.editable) {
                    // 编辑状态
                    let options = {
                        method: 'POST',//post请求
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(this.currentAlbum)
                    }
                    fetch(this.baseUrl + '/update', options).then(res => {
                        return res.json();
                    }).then(json => {
                        // if (json.type === 'success') {
                        //     this.books.push(bk);
                        // }
                        this.albums.push(json);
                    }).catch(err => {
                        alert(err);
                    })

                } else {
                    this.isShowDetailDialog = false;
                }
            },

            deleteAlbum(album){
                this.$confirm('确定要删除该专辑吗', '专辑删除', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消'
                }).then(() => {
                    let options = {
                        method: 'DELETE',//post请求
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        }
                    }
                    fetch(`${this.baseUrl}/${album._id}`, options).then(res => {
                        return res.json();
                    }).then(json => {
                        console.log(json);
                        let index=this.albums.findIndex(item=>item._id==album._id);
                        this.albums.splice(index, 1);
                    }).catch(err => {
                        alert(err);
                    })
                }).catch(() => {
                    console.log('已取消删除');
                });
                // let index=this.books.findIndex(item=>item.id==book.id)


            },
            addAlbum(){
                this.type = 'add';
                // this.book.id=++this.maxId
                let options = {
                    method: 'POST',//post请求
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(this.currentAlbum)
                }
                fetch(this.baseUrl + '/add', options).then(res => {
                    return res.json();
                }).then(json => {
                    // if (json.type === 'success') {
                    //     this.books.push(bk);
                    // }
                    this.albums.push(json);
                    this.$message({
                        showClose: true,
                        message: '专辑添加成功'
                    });
                }).catch(err => {
                    alert(err);
                })
                // this.books.push(bk)
            },
            handleClose() {

            },
            updateAlbum() {
                let options = {
                    method: 'POST',//post请求
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(this.currentAlbum)
                }
                fetch(this.baseUrl, options).then(res => {
                    return res.json();
                }).then(json => {
                    console.log(json);
                }).catch(err => {
                    alert(err);
                })
            }
        },
        computed:{
            priceTotal(){
                return this.books.reduce((prev,book)=>prev+book.price,0)
            }
        }
    }
</script>

<style scoped>

    .detail-block {

    }

    .detail-property-block {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 10px;
    }

    .detail-property-block > span {
        width: 150px;
    }
    .detail-property-block input {
        flex: 1;
    }



</style>
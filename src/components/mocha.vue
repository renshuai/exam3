<template>
    <div>
        <h1>测试AlbumsDao</h1>
        <pre>
            const mongoose=require('mongoose')
        require('../model/index')
        let albumsDao=require('../dao/index');
        const assert=require('assert')

        describe("测试AlbumsDao",function () {
            before(function () {
                mongoose.connect('mongodb://39.98.54.111/mydb',function (err) {

                })
            })
            after(function () {
                mongoose.disconnect()
            })

            it("测试添加所有专辑",function (done) {
                let albums = [
                    {
                        "album_id": "3751508",
                        "album_name": "A.I. 爱",
                        "public_time": "2017-12-11",
                        "week": 50,
                        "price": 89,
                        "cover": "http://imgcache.qq.com/music/photo/album_300/08/300_albumpic_3751508_0.jpg",
                        "singers": [
                            {
                                "singer_id": "265",
                                "singer_name": "王力宏"
                            }
                        ]
                    },
                    {
                        "album_id": "3766916",
                        "album_name": "Pay the Man (Remix)",
                        "public_time": "2017-12-13",
                        "week": 50,
                        "price": 78,
                        "cover": "http://imgcache.qq.com/music/photo/album_300/16/300_albumpic_3766916_0.jpg",
                        "singers": [
                            {
                                "singer_id": "28132",
                                "singer_name": "Foster The People"
                            },
                            {
                                "singer_id": "191884",
                                "singer_name": "J.I.D"
                            },
                            {
                                "singer_id": "173561",
                                "singer_name": "Saba"
                            }
                        ]
                    },
                    {
                        "album_id": "3327203",
                        "album_name": "Dreamer (梦想家)",
                        "public_time": "2017-12-08",
                        "week": 49,
                        "price": 102,
                        "cover": "http://imgcache.qq.com/music/photo/album_300/03/300_albumpic_3327203_0.jpg",
                        "singers": [
                            {
                                "singer_id": "941206",
                                "singer_name": "Axwell Λ Ingrosso"
                            },
                            {
                                "singer_id": "159855",
                                "singer_name": "Trevor Guthrie"
                            }
                        ]
                    },
                    {
                        "album_id": "3766915",
                        "album_name": "Don't Don't Do It!",
                        "public_time": "2017-12-13",
                        "week": 50,
                        "price": 65,
                        "cover": "http://imgcache.qq.com/music/photo/album_300/15/300_albumpic_3766915_0.jpg",
                        "singers": [
                            {
                                "singer_id": "13317",
                                "singer_name": "N.E.R.D"
                            },
                            {
                                "singer_id": "28021",
                                "singer_name": "Kendrick Lamar (肯德里克·拉马尔)"
                            }
                        ]
                    },
                    {
                        "album_id": "3324740",
                        "album_name": "Trigger Bang",
                        "public_time": "2018-01-05",
                        "week": 1,
                        "price": 123,
                        "cover": "http://imgcache.qq.com/music/photo/album_300/40/300_albumpic_3324740_0.jpg",
                        "singers": [
                            {
                                "singer_id": "5125",
                                "singer_name": "Lily Allen (莉莉·艾伦)"
                            },
                            {
                                "singer_id": "49917",
                                "singer_name": "Giggs"
                            }
                        ]
                    }
                ];
                albumsDao.addAlbums(albums,function (err, newAlbums) {
                    assert.ok(!err)
                    done()
                })
            })

        })

        </pre>
        <h1>测试爬虫</h1>
        <pre>
            const spider = require('../spider/index');
            const assert=require('assert')

            describe("测试爬虫",function () {
                before(function () {

                })
                after(function () {

                })

                it("测试request",function (done) {
                    const options = {
                        host: 'johnyu.cn',
                        port: 3000,
                        path: '/albums'
                    };
                    spider.request(options, function (err, albums) {
                        assert(!err);
                    })
                    done();
                })


            })
        </pre>
    </div>
</template>

<script>
    export default {
        name: "save"
    }
</script>

<style scoped>

</style>
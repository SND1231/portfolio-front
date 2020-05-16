<template>
  <v-container class="top" fluid fill-height>
    <v-card>
      <v-card-actions>
        <v-btn v-on:click="add_posts">記事追加</v-btn>
      </v-card-actions>
    </v-card>
    <v-row dense 
      class="mb-6"
      justify="center"
    >
      <v-col
       class ="pt-10"
       v-model="posts"
       v-for="post in posts"
       :key="post.id"
       cols="12" md="8"
      >
        <v-card>
          <v-img
            :src="post.photoUrl"
            class="white--text align-end"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            height="400px"
          >
            <v-card-title v-text="post.title"></v-card-title>
            <v-row>
              <v-col cols="8">
                <v-card-text>
                  <v-icon color="white">mdi-heart</v-icon> 1
                </v-card-text>
              </v-col>
              <v-col cols="4">
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn>詳細を開く</v-btn>
                </v-card-actions>
              </v-col>
            </v-row>    
          </v-img>
        </v-card>
      </v-col>
    </v-row>
  </v-container>

</template>

<script>
export default {
  name: 'top',
  data () {
    return {
      posts: [
        {
            "id": 1,
            "title": "蒙古タンメン",
            "content": "辛くておいしい",
            "photoUrl": "https://msp.c.yimg.jp/yjimage?q=bBEzKgkXyLF0jeCC7CA_OhZb.pWNTl_45WGyCBeCG9RLlDRVSzpDIlRoGz_JV9iztvGJFMu.qmijiYmbpc_.ZbEIlAaXgEXu0A09V1s2tAf0LyTIzW3HcE1kqf_Geo1W83VUYKiquKmAA4F5M35N&sig=13atah3v6&x=259&y=194",
            "userId": 5
        },
        {
            "id": 2,
            "title": "二郎",
            "content": "食べたい",
            "photoUrl": "https://msp.c.yimg.jp/yjimage?q=TIwCAJkXyLH.S03AkQDffB1bsgykmO2XnrQoNr0UDLOCThcC_HjB3ERPW7ZsJICi3wjHK5Dl5vxqY.i59rBX_X6_cq3Qx3QVMhNuU73zpl3RePFZaN.0gYPTEpeWxa0iO877ppIGFB_jS7o2RLGevH0-&sig=13cioce41&x=259&y=194",
            "userId": 5
        },
        {
            "id": 1,
            "title": "蒙古タンメン",
            "content": "辛くておいしい",
            "photoUrl": "https://msp.c.yimg.jp/yjimage?q=bBEzKgkXyLF0jeCC7CA_OhZb.pWNTl_45WGyCBeCG9RLlDRVSzpDIlRoGz_JV9iztvGJFMu.qmijiYmbpc_.ZbEIlAaXgEXu0A09V1s2tAf0LyTIzW3HcE1kqf_Geo1W83VUYKiquKmAA4F5M35N&sig=13atah3v6&x=259&y=194",
            "userId": 5
        },
        {
            "id": 2,
            "title": "二郎",
            "content": "食べたい",
            "photoUrl": "https://msp.c.yimg.jp/yjimage?q=TIwCAJkXyLH.S03AkQDffB1bsgykmO2XnrQoNr0UDLOCThcC_HjB3ERPW7ZsJICi3wjHK5Dl5vxqY.i59rBX_X6_cq3Qx3QVMhNuU73zpl3RePFZaN.0gYPTEpeWxa0iO877ppIGFB_jS7o2RLGevH0-&sig=13cioce41&x=259&y=194",
            "userId": 5
        }
      ]
    }
  },
  methods: {
    add_posts: function () {
      Array.prototype.push.apply(this.posts,
        [
          {
              "id": 3,
              "title": "蒙古タンメン",
              "content": "辛くておいしい",
              "photoUrl": "https://msp.c.yimg.jp/yjimage?q=bBEzKgkXyLF0jeCC7CA_OhZb.pWNTl_45WGyCBeCG9RLlDRVSzpDIlRoGz_JV9iztvGJFMu.qmijiYmbpc_.ZbEIlAaXgEXu0A09V1s2tAf0LyTIzW3HcE1kqf_Geo1W83VUYKiquKmAA4F5M35N&sig=13atah3v6&x=259&y=194",
              "userId": 5
          },
          {
              "id": 4,
              "title": "二郎",
              "content": "食べたい",
              "photoUrl": "https://msp.c.yimg.jp/yjimage?q=TIwCAJkXyLH.S03AkQDffB1bsgykmO2XnrQoNr0UDLOCThcC_HjB3ERPW7ZsJICi3wjHK5Dl5vxqY.i59rBX_X6_cq3Qx3QVMhNuU73zpl3RePFZaN.0gYPTEpeWxa0iO877ppIGFB_jS7o2RLGevH0-&sig=13cioce41&x=259&y=194",
              "userId": 5
          }
        ]
      )
      console.log(this.posts)
    }
  }
}
</script>
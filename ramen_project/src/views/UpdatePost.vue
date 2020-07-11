<template>
  <v-container>
    <v-form ref="updatePostsForm">
      <v-row>
        <v-col
          cols="12"
          sm="8"
        >
          <v-text-field
            v-model="title"
            label="タイトル(30字以下)"
            :rules="[valueRequired, limitLengthTitle]"
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-textarea
            v-model="content"
            color="teal"
            outlined
            :rules="[counterRequired, limitLengthContent]"
          >
            <template v-slot:label >
              <div>
                本文(400字以下)
              </div>
            </template>
          </v-textarea>
        </v-col>
      </v-row>
    </v-form>
    <div class="text-right">
      <v-btn class="ma-2 white--text" color="blue" v-on:click="updatePosts">投稿を編集</v-btn>
    </div>
  </v-container>
</template>

<script>
import createAxios from '@/js/createAxios.js'
import getCookieDataByKey from "@/js/getCookieData.js"

export default {
  name: 'UpdatePost',
  data: () => ({
    title: "",
    content: "",
    valueRequired: value => !!value || "必ず入力してください",
    counterRequired: counter => !!counter || "必ず入力してください", 
    limitLengthTitle: value => value.length <= 30,
    limitLengthContent: counter => counter.length <= 400 || "400字以内にしてください"
  }),
  mounted: async function () {
    let axios = createAxios();
    const config = {
          headers: {
            'Authorization': getCookieDataByKey("token")
          }
        };
    let self = this;

    await axios.get('/v1/posts/' + this.$route.params.postId, config, {}
      ).then(function (response) {
        self.title = response.data.post.title;
        self.content = response.data.post.content;
      }).catch(err => {
        console.log(err);
      });
  },
  methods: {
    updatePosts: function() {
      let axios = createAxios();
      const config = {
            headers: {
              'Authorization': getCookieDataByKey("token")
            }
          };
      const postData = {"title": this.title, "content": this.content};
      let postId = this.$route.params.postId

      axios.put('/v1/posts/' + postId, postData, config
        ).then(function () {
          window.location.href = "/posts/" + postId;
        }).catch(err => {
          console.log('err:', err.response.data);
          this.message = err.response.data;
        });
    }
  }
}
</script>

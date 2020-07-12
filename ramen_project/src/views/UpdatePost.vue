<template>
  <v-container>
    <v-form ref="update_posts_form">
      <v-row>
        <v-col
          cols="12"
          sm="8"
        >
          <v-text-field
            v-model="title"
            label="タイトル(30字以下)"
            :rules="[value_required, limit_length_title]"
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-textarea
            v-model="content"
            color="teal"
            outlined
            :rules="[counter_required, limit_length_content]"
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
      value_required: value => !!value || "必ず入力してください",
      counter_required: counter => !!counter || "必ず入力してください", 
      limit_length_title: value => value.length <= 30,
      limit_length_content: counter => counter.length <= 400 || "400字以内にしてください"
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
        const post_data = {"title": this.title, "content": this.content};
        let post_id = this.$route.params.postId

        axios.put('/v1/posts/' + post_id, post_data, config
          ).then(function () {
            window.location.href = "/posts/" + post_id;
          }).catch(err => {
            console.log('err:', err.response.data);
            this.message = err.response.data;
          });
      }
    }
  }
</script>

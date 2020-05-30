<template>
  <Loading v-if="loading"></Loading>
  <v-card
    max-width="800"
    class="mx-auto"
    color="black"
    dark
    v-else
  >
    <v-container>
      <v-row
        align="center"
        class="spacer"
        no-gutters
      >
        <v-col
          cols="12"
          md="1"
        >
          <v-avatar
            size="60px"
          >
            <img
              alt="Avatar"
              :src="user.photoUrl"
            >
          </v-avatar>  
          
        </v-col>
        <v-col
          classs="ml-3 subtitle-1"
          cols="12"
          md="10"
        >
          <strong >{{ user.name }}</strong>
        </v-col>
        <v-col
          cols="12"
          md="12"
        >
          <v-card-title class=".font-weight-bold" v-text="post.title"></v-card-title>
          <v-img
              :src="post.photoUrl"
              class="white--text align-end"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="400px"
            >
          </v-img>
          <v-card-text class=".font-weight-bold" style="white-space:pre-wrap; word-wrap:break-word;" v-text="post.content"></v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn v-show="click_like" v-on:click="clickLike"><v-icon  color="pink">mdi-heart</v-icon> {{ showLikes(post.likes) }}</v-btn>
            <v-btn v-show="!click_like" disabled><v-icon v-show="!click_like" disabled>mdi-heart</v-icon>{{ showLikes(post.likes) }}</v-btn>
            <v-btn v-show="same_user" :to="{name: 'UpdatePost', params: {postId: post.id}}" color="blue">投稿を更新</v-btn>
            <v-btn v-show="same_user" v-on:click="deletePost" color="blue">投稿を削除</v-btn>
          </v-card-actions>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
  import createAxios from '@/js/createAxios.js'
  import getCookieDataByKey from "@/js/getCookieData.js"
  import Loading from "@/components/Loading";

  export default {
    name: 'DetailPost',
    data: () => ({
      post: {"title": ""},
      user: {"photoUrl": ""},
      user_id: null,
      click_like: false,
      like_id: null,
      same_user: false,
      loading: true
    }),
    components: { Loading },
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
          self.post = response.data.post;
          self.user_id = response.data.post.userId;
        }).catch(err => {
          console.log(err);
        });
      await axios.get('/v1/users/' + this.user_id, config, {}
        ).then(function (response){
          self.user = response.data.user;
        }).catch(err =>{
          console.log('err:', err);
        });
      await axios.get('/v1/likes/' + getCookieDataByKey("user_id") + '/' + this.post.id, config, {}
        ).then(function (response){
          console.log(response.data.liked)
          if(response.data.liked == undefined){
            self.click_like = true;
          }
        }).catch(err =>{
          console.log('err:', err);
        });
      
      if (this.user_id == getCookieDataByKey("user_id")){
        this.same_user = true;
      }

      this.loading = false;
    },
    methods: {
      showLikes: function(likes) {
        if(likes == undefined){
          return 0;
        }
        return likes;
      },
      clickLike: function() {
        if(this.post.likes == undefined){
          this.post.likes = 0
        }
        this.post.likes = this.post.likes + 1;
        this.click_like = false;
        let axios = createAxios();
        const config = {
              headers: {
                'Authorization': getCookieDataByKey("token")
              }
            };
        let self = this;
        axios.post('/v1/likes', {"userId": getCookieDataByKey("user_id"), "postId": self.post.id}, config
          ).then(function (response) {
            self.post.likes = response.data.count;
          }).catch(err => {
            console.log('err:', err.response.data);
            this.message = err.response.data;
          });
      },
      deletePost: function() {
        let axios = createAxios();
        const config = {
              headers: {
                'Authorization': getCookieDataByKey("token")
              }
            };
        axios.delete('/v1/posts/' + this.post.id + '/user/' + this.user_id , config
          ).then(function () {
            window.location.href = "/";
          }).catch(err => {
            console.log('err:', err.response.data);
            this.message = err.response.data;
          });
      }
    }
  }
</script>

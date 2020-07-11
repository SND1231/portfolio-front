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
          <router-link :to="{name: 'DetailUser', params: {userId: userId}}">
            <v-avatar
              size="60px"
              :to="{name: 'DetailUser', params: {userId: user.id}}"
            >
              <img
                alt="Avatar"
                :src="user.photoUrl"
              >
            </v-avatar> 
          </router-link>
          
        </v-col>
        <v-col
          classs="ml-3 subtitle-1"
          cols="12"
          md="10"
        >
          <v-card-title class="white--text headline">{{ user.name }}</v-card-title>
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
            <v-btn v-show="clickLike" v-on:click="createLike">
              <v-icon  color="pink">mdi-heart</v-icon> {{ showLikes(post.likes) }}
            </v-btn>
            <v-btn v-show="!clickLike" v-on:click="deleteLike">
              <v-icon v-show="!clickLike" disabled>mdi-heart</v-icon>{{ showLikes(post.likes) }}
            </v-btn>
            <v-btn v-show="sameUser" :to="{name: 'UpdatePost', params: {postId: post.id}}" color="blue">
              <v-icon  color="white">mdi-update</v-icon>投稿を更新
            </v-btn>
            <v-btn v-show="sameUser" @click.stop="dialog = true" color="blue">
              <v-icon  color="white">mdi-delete</v-icon>投稿を削除
            </v-btn>
          </v-card-actions>
          <v-dialog
            v-model="dialog"
            max-width="290"
          >
            <v-card>
              <v-card-title class="headline">
                本当に削除しますか？
              </v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="green darken-1"
                  text
                  @click="dialog = false"
                >
                  キャンセル
                </v-btn>

                <v-btn
                  color="green darken-1"
                  text
                  @click="deletePost"
                >
                  削除
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
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
      userId: null,
      clickLike: false,
      likeId: null,
      sameUser: false,
      loading: true,
      dialog: false,
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
          self.post    = response.data.post;
          self.userId = response.data.post.userId;
        }).catch(err => {
          console.log(err);
        });
      await axios.get('/v1/users/' + this.userId, config, {}
        ).then(function (response){
          self.user = response.data.user;
        }).catch(err =>{
          console.log('err:', err);
        });
      await axios.get('/v1/likes/' + getCookieDataByKey("userId") + '/' + this.post.id, config, {}
        ).then(function (response){
          if(response.data.liked == undefined){
            self.clickLike = true;
          }else{
            self.likeId = response.data.id;
          }
        }).catch(err =>{
          console.log('err:', err);
        });
      
      if (this.userId == getCookieDataByKey("userId")){
        this.sameUser = true;
      }

      this.loading = false;
    },
    methods: {
      showLikes: function(likes) {
        if(likes == undefined){
          return 0
        }
        return likes;
      },
      deletePost: function() {
        let axios = createAxios();
        const config = {
              headers: {
                'Authorization': getCookieDataByKey("token")
              }
            };
        axios.delete('/v1/posts/' + this.post.id + '/user/' + this.userId , config
          ).then(function () {
            window.location.href = "/";
          }).catch(err => {
            console.log('err:', err.response.data);
            this.message = err.response.data;
          });
      },
      createLike: function() {
        if(this.post.likes == undefined){
          this.post.likes = 0
        }
        this.post.likes = this.post.likes + 1;
        this.clickLike = false;

        let axios = createAxios();
        const config = {
              headers: {
                'Authorization': getCookieDataByKey("token")
              }
            };
        let self = this;
        axios.post('/v1/likes', {"userId": getCookieDataByKey("userId"), "postId": self.post.id}, config
          ).then(function (response) {
            self.likeId    = response.data.id
            self.post.likes = response.data.count;
          }).catch(err => {
            console.log('err:', err.response.data);
            this.message = err.response.data;
          });
      },
      deleteLike: function() {
        let axios = createAxios();
        const config = {
              headers: {
                'Authorization': getCookieDataByKey("token")
              }
            };
        let self = this;
        this.clickLike = true;

        self.post.likes = self.post.likes -1
        axios.delete('/v1/likes/' + self.likeId, config
          ).then(function (response) {
            console.log(response)
            self.post.likes = response.data.count;
            self.likeId    = null
          }).catch(err => {
            this.message = err.response.data;
          });
      }
    }
  }
</script>

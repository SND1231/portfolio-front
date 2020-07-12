<template>
  <Loading v-if="loading"></Loading>
  <v-card
    max-width="800"
    class="mx-auto"
    v-else
    dark
  >
    <v-container>
      <v-row
        align="center"
        class="spacer"
        no-gutters
      >
        <v-col
          cols="12"
          md="2"
        >
          <v-avatar
            size="100px"
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
          md="9"
        >
          <v-card-title class="white--text headline">{{ user.name }}</v-card-title>
        </v-col>
      </v-row>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
         v-show="sameUser"
         class="white--text"
         :to="{name: 'UpdateUser', params: {userId: user.id}}"
         color="blue">
          <v-icon  color="white">mdi-update</v-icon>ユーザ情報を更新
        </v-btn>
      </v-card-actions>

      <v-layout justify-center>
        <v-card-title>ユーザの投稿一覧</v-card-title>
      </v-layout>
      <v-pagination
        v-model="page"
        :length="length"
        :total-visible="10"
        class="my-4"
        @input = "showPage"
      ></v-pagination>
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
            <router-link
             :to="{name: 'DetailPost', params: {postId: post.id}}"
            >
              <v-img to="/about"
                :src="post.photoUrl"
                class="white--text align-end"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                height="400px"
              >
                <v-card-title v-text="post.title"></v-card-title>
                <v-row>
                  <v-col cols="8">
                    <v-card-text>
                      <v-icon color="white">mdi-heart</v-icon>{{ showLikes(post.likes) }} 
                    </v-card-text>
                  </v-col>
                </v-row>    
              </v-img>
            </router-link>
          </v-card>
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
    name: 'DetailUser',
    components: { Loading },
    data: () => ({
      posts: [],
      user: {"photoUrl": ""},
      userId: null,
      page: 1,
      length: 0,
      loading: true,
      sameUser: false,
    }),
    mounted: async function () {
      let self = this;
      let axios = createAxios();
      let limit = 3;
      const config = {
            headers: {
              'Authorization': getCookieDataByKey("token")
            }
          };
      self.userId = self.$route.params.userId;
    
      await  axios.get('/v1/posts', {params: {limit:limit, offset:self.page, id: self.userId}}
        ).then(function (response) {
          self.posts = response.data.posts;
          self.length = Math.ceil(response.data.count/limit);
        }).catch(err => {
          console.log('err:', err.response);
        });

      await axios.get('/v1/users/' + this.userId, config, {}
        ).then(function (response){
          self.user = response.data.user;
          self.loading = false;

          if (self.user.id == getCookieDataByKey("userId")){
            self.sameUser = true;
          }
        }).catch(err =>{
          console.log('err:', err);
        });
    },
    methods: {
      showPage: async function () {
        let self = this;
        let axios = createAxios();
        let limit = 3;
        await  axios.get('/v1/posts', {params: {limit:limit, offset:self.page, id: self.userId}}
          ).then(function (response) {
            self.posts = response.data.posts
            self.length = Math.ceil(response.data.count/limit);
          }).catch(err => {
            console.log('err:', err.response);
          });
        },
      showLikes: function(likes) {
        if(likes == undefined){
          return 0
        }
        return likes
      },
      
    },
  }
</script>

<style>
  a {
     text-decoration: none;
  }
</style>
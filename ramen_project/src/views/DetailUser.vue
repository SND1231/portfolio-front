<template>
  <Loading v-if="loading"></Loading>
  <v-card
    max-width="800"
    class="mx-auto"
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
          <v-card-title class="headline text--primary">{{ user.name }}</v-card-title>
        </v-col>
      </v-row>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
         v-show="same_user"
         class="white--text"
         :to="{name: 'UpdateUser', params: {userId: user.id}}"
         color="blue">
         ユーザ情報を更新
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
                    <v-icon color="white">mdi-heart</v-icon>{{ showLikes(post.likes) }} 
                  </v-card-text>
                </v-col>
                <v-col cols="4">
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn :to="{name: 'DetailPost', params: {postId: post.id}}">詳細を開く</v-btn>
                  </v-card-actions>
                </v-col>
              </v-row>    
            </v-img>
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
      user_id: null,
      page: 1,
      length: 0,
      loading: true,
      same_user: false,
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
      self.user_id = self.$route.params.userId;
    
      await  axios.get('/v1/posts', {params: {limit:limit, offset:self.page, id: self.user_id}}
        ).then(function (response) {
          self.posts = response.data.posts;
          self.length = Math.ceil(response.data.count/limit);
        }).catch(err => {
          console.log('err:', err.response);
        });

      await axios.get('/v1/users/' + this.user_id, config, {}
        ).then(function (response){
          self.user = response.data.user;
          self.loading = false;

          if (self.user.id == getCookieDataByKey("user_id")){
            self.same_user = true;
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
        await  axios.get('/v1/posts', {params: {limit:limit, offset:self.page, id: self.user_id}}
          ).then(function (response) {
            self.posts = response.data.posts
            self.length = Math.ceil(response.data.length/limit);
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


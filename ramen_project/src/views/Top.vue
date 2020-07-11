<template>
  <Loading v-if="loading"></Loading>
  <v-container
   class="top"
   fluid
   fill-height
   v-else
  >
    <v-row
      class="lighten-4" style="height: 200px;"
      justify="center" align-content="center"
    >
      <v-col md=4>
        <v-text-field
          v-model="searchTitle"
          label="タイトル検索"
          outlined
        ></v-text-field>
      </v-col>
      <v-col md=12>
        <v-layout justify-center>
          <v-btn class="white--text" color="blue" @click="searchTitles">検索</v-btn>
        </v-layout>
      </v-col>
      <v-col md=12>
        <v-layout class="red--text" justify-center>
          {{ noDataMessage }} 
        </v-layout>
      </v-col>
    </v-row>
    <v-pagination
      v-model="page"
      :length="length"
      :total-visible="10"
      class="my-4"
      @input = "showPage"
    >
    </v-pagination>
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
          <router-link :to="{name: 'DetailPost', params: {postId: post.id}}">
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
              </v-row>    
            </v-img>
          </router-link>
        </v-card>
      </v-col>
    </v-row>
  </v-container>

</template>

<script>
  import createAxios from '@/js/createAxios.js'
  import getCookieDataByKey from "@/js/getCookieData.js"
  import Loading from "@/components/Loading";

  async function getPosts(page, params){
    let axios = createAxios();
    let posts = [];
    let length = 0;

    console.log(params)

    await axios.get('/v1/posts', {params: params}
      ).then(function (response) {
        posts = response.data.posts;
        if(response.data.count != undefined){
          length = Math.ceil(response.data.count/params["limit"]);
        }else{
          length = 0;
        }
      }).catch(err => {
        console.log('err:', err.response);
      });
    let data = {"posts":posts, "length":length}
    return data;
  }

  export default {
    name: 'top',
    components: { Loading },
    data () {
      return {
        posts: [],
        page: 1,
        length: 0,
        limit: 3,
        searchTitle: "",
        noDataMessage: "",
        loading: true,
      }
    },
    mounted () {
      this.params = {limit: this.limit, offset: this.page}
      getPosts(this.page, this.params).then(data => {
        this.posts = data.posts
        this.length = data.length
        this.loading = false;
      });
    },
    methods: {
      showPage:  function () {
        this.params["offset"] = this.page;
        getPosts(this.page, this.params).then(data => {
          this.posts = data.posts
          this.length = data.length
        });
      },
      showLikes: function(likes) {
        if(likes == undefined){
          return 0
        }
        return likes
      },
      searchTitles: function() {
        this.noDataMessage = "";
        this.params["title"] = this.searchTitle;
        getPosts(this.page, this.params).then(data => {
          if(data.length == 0){
            this.noDataMessage = "検索結果は0件です"
            return
          }
          this.posts = data.posts
          this.length = data.length
        });

      }
    },
    computed: {
      isAuthenticated: function() {
        let authenticated = getCookieDataByKey("authenticated");
        if(authenticated=="True"){
          return true
        }
        return false
      }
    }
  }
</script>

<style>
  a {
     text-decoration: none;
  }
</style>

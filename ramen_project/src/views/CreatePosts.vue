<template>
  <v-container>
    <v-form ref="create_posts_form">
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
        <v-col
          cols="12"
          sm="8"
        >
          <v-file-input @change="selectedFile" show-size counter multiple :rules="[value_required]" label="写真ファイル"></v-file-input>
        </v-col>
      </v-row>
    </v-form>
    <div class="text-right">
      <v-btn class="ma-2 white--text" color="blue" v-on:click="createPosts">投稿作成</v-btn>
    </div>
  </v-container>
</template>

<script>
  import createAxios from '@/js/createAxios.js'
  import getCookieDataByKey from "@/js/getCookieData.js"
  import uploadFile from "@/js/upload.js"

  export default {
    data: () => ({
      title: "",
      content: "",
      file: null,
      message: "",
      value_required: value => !!value || "必ず入力してください",
      counter_required: counter => !!counter || "必ず入力してください", 
      limit_length_title: value => value.length <= 30,
      limit_length_content: counter => counter.length <= 400 || "400字以内にしてください"
    }),
    methods: {
      createPosts: async function() {
        if (!this.$refs.create_posts_form.validate()){
          return
        }
        
        uploadFile(this.file).then(url => {
          if (url == null){
            return
          }

          var axios = createAxios();
          const config = {
            headers: {
              'Authorization': getCookieDataByKey("token")
            }
          };
          const post_data = {"title": this.title, "content": this.content,
                            "photoUrl": url,"userId": getCookieDataByKey("user_id")
                            };
          
          axios.post('/v1/posts', post_data, config
            ).then(function () {
              window.location.href = "/";
            }).catch(err => {
              console.log('err:', err.response.data);
              this.message = err.response.data;
            });
          }).catch(err => {
            console.log(err);
          });
      },
      selectedFile: function(e){
        let file = e[0];
        console.log(file);
        console.log(typeof file);
        this.file = file;
      },
    }
  }
  
</script>

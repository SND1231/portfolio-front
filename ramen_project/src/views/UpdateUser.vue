<template>
  <Loading v-if="loading"></Loading>
  <v-container v-else>
    <v-form ref="update_users_form">
      <v-row>
        <v-col
          cols="12"
          sm="8"
        >
          <v-text-field
            v-model="name"
            label="ユーザー名(20字以下)"
            :rules="userNameRules"
          ></v-text-field>
        </v-col>
        <v-col
          cols="12"
          sm="8"
        >
          <v-file-input @change="selectedFile" show-size counter multiple label="写真ファイル"></v-file-input>
        </v-col>
      </v-row>
    </v-form>
    <div class="text-right">
      <v-btn class="ma-2 white--text" color="blue" v-on:click="createUsers">ユーザ情報更新</v-btn>
    </div>
  </v-container>
</template>

<script>
  import createAxios from '@/js/createAxios.js'
  import getCookieDataByKey from "@/js/getCookieData.js"
  import uploadFile from "@/js/upload.js"
  import Loading from "@/components/Loading";

  export default {
    name: 'CreateUsers',
    data: () => ({
      name: "",
      file: null,
      photo_url: null,
      message: "",
      loading: true,
      user_id: getCookieDataByKey("user_id"),
      value_required: value => !!value || "必ず入力してください",
      userNameRules:[
        value => !!value || "必ず入力してください",
        value => value.length <= 20 || "20字以下にしてください",
      ],
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

      await axios.get('/v1/users/' + self.user_id, config, {}
        ).then(function (response){
          self.name = response.data.user.name;
          self.loading = false;
        }).catch(err =>{
          console.log('err:', err);
        });
    },
    methods: {
      createUsers: function() {
        if (!this.$refs.update_users_form.validate()){
          return
        }
        
        uploadFile(this.file).then(url => {
          let self = this;
          var axios = createAxios();
          const config = {
            headers: {
              'Authorization': getCookieDataByKey("token")
            }
          };
          let photo_url = url
          if (url == null){
            photo_url = self.photo_url
          }
          const post_data = {"name": this.name, "photoUrl": photo_url};
          
          axios.put('/v1/users/' + self.user_id , post_data, config
            ).then(function () {
              window.location.href = "/users/" + self.user_id;
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
        this.file = file;
      },
    }
  }
</script>

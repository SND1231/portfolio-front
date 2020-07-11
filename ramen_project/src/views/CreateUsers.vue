<template>
  <v-container>
    <v-form ref="createUsersForm">
      <v-row>
        <v-col
          cols="12"
          sm="8"
        >
          <v-text-field
            v-model="name"
            label="ユーザー名(20字以下)"
            :rules="[valueRequired]"
          ></v-text-field>
        </v-col>
        <v-col
          cols="12"
          sm="8"
        >
          <v-text-field
            v-model="email"
            label="email"
            :rules="emailRules"
          ></v-text-field>
        </v-col>
        <v-col
          cols="12"
          sm="8"
        >
          <v-text-field
            v-model="password"
            label="パスワード"
            :rules="passwordRules"
          ></v-text-field>
        </v-col>
        <v-col
          cols="12"
          sm="8"
        >
          <v-file-input @change="selectedFile" show-size counter multiple :rules="[valueRequired]" label="写真ファイル"></v-file-input>
        </v-col>
      </v-row>
    </v-form>
    <div class="text-right">
      <v-btn class="ma-2 white--text" color="blue" v-on:click="createUsers">ユーザ登録</v-btn>
    </div>
  </v-container>
</template>

<script>
  import createAxios from '@/js/createAxios.js'
  import uploadFile from "@/js/upload.js"

  export default {
    name: 'CreateUsers',
    data: () => ({
      name: "",
      email: "",
      password: "",
      file: null,
      message: "",
      valueRequired: value => !!value || "必ず入力してください",
      userNameRules:[
        value => !!value || "必ず入力してください",
        value => value.length <= 20,
      ],
      emailRules: [
        value => !!value || "必ず入力してください",
        value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@]+(\.[^<>()[\]\\.,;:\s@]+)*)|(.+))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || "Invalid e-mail."
        },
      ],
      passwordRules:[
        value => !!value || "必ず入力してください",
        value => (value || "").length >= 8 || "最低8文字は入力してください",
      ]
    }),
    methods: {
      createUsers: function() {
        if (!this.$refs.createUsersForm.validate()){
          return
        }
        
        uploadFile(this.file).then(url => {
          if (url == null){
            return
          }
          const postData = {"name": this.name, "email": this.email,
                             "password": this.password, "photoUrl": url,
                            };
          var axios = createAxios();
          axios.post('/v1/users', postData
            ).then(function (response) {
              document.cookie = 'token=' + response.data.token;
              document.cookie = 'userId=' + response.data.id;
              document.cookie = 'authenticated=True';
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
        this.file = file;
      },
    }
  }
</script>

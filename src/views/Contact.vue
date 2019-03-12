<template>
  <div class="container">
    <form action="/post" method="post" @submit="SendForm">
      <div class="columns">
        <div class="column is-half is-offset-one-quarter cc mg">
          <div class="control">
            <input class="input is-primary" type="text" v-model="nom" placeholder="Nom" required>
          </div>
        </div>
      </div>
      <div class="columns">
        <div class="column is-half is-offset-one-quarter cc">
          <div class="control">
            <input class="input is-primary" type="text" v-model="prenom" placeholder="Prenom">
          </div>
        </div>
      </div>
      <div class="columns">
        <div class="column is-half is-offset-one-quarter cc">
          <div class="field">
            <p class="control has-icons-left has-icons-right">
              <input
                class="input is-primary"
                type="email"
                v-model="email"
                placeholder="Email"
                required
              >
              <span class="icon is-small is-left">
                <i class="fas fa-envelope"></i>
              </span>
            </p>
          </div>
        </div>
      </div>
      <div class="columns">
        <div class="column is-half is-offset-one-quarter cc">
          <div class="field">
            <p class="control has-icons-left has-icons-right">
              <input class="input is-primary" type="tel" v-model="tel" placeholder="Tel" required>
              <span class="icon is-small is-left">
                <i class="fas fa-phone"></i>
              </span>
            </p>
          </div>
        </div>
      </div>
      <div class="columns">
        <div class="column is-half is-offset-one-quarter cc">
          <div class="control">
            <input class="input is-primary" type="text" v-model="adresse" placeholder="Adresse">
          </div>
        </div>
      </div>
      <div class="columns">
        <div class="column is-half is-offset-one-quarter cc">
          <div class="control">
            <input class="input is-primary" type="text" v-model="cp" placeholder="CP">
          </div>
        </div>
      </div>
      <div class="columns">
        <div class="column is-half is-offset-one-quarter cc">
          <div class="control">
            <input class="input is-primary" type="text" v-model="ville" placeholder="Ville">
          </div>
        </div>
      </div>

      <div class="columns">
        <div class="column is-half is-offset-one-quarter cc">
          <div class="control">
            <textarea
              class="textarea is-primary"
              v-model="msg"
              placeholder="Votre demande"
              required
            ></textarea>
          </div>
        </div>
      </div>

      <!--       <div class="columns">
        <div class="column is-half is-offset-one-quarter cc">
          <div class="file has-name">
            <label class="file-label">
              <input class="file-input" type="file" id="file" ref="file" v-on:change="changeFic()">
              <span class="file-cta">
                <span class="file-icon">
                  <i class="fas fa-upload"></i>
                </span>
                <span class="file-label is-primary">Choisissez un fichier</span>
              </span>
              <span class="file-name is-primary">{{fic.name}}</span>
            </label>
          </div>
        </div>
      </div>-->
      <div class="columns">
        <div class="column is-half is-offset-one-quarter cc mg">
          <div class="control has-text-centered">
            <input type="submit" class="button is-primary" value="Envoyer">
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import router from "../router";
const sesinfos = require("@/ses_infos.js");

export default {
  name: "contact",
  data: () => ({
    nom: "",
    prenom: null,
    email: "",
    tel: "",
    adresse: null,
    cp: null,
    ville: null,
    msg: "",
    fic: ""
  }),
  methods: {
    changeFic: function(e) {
      const files = this.$refs.file.files;
      const data = new FormData();
      this.fic = files[0];
      console.log(this.fic);
    },
    SendForm: function(e) {
      e.preventDefault();

      let mess = `Nom : ${this.nom}<br>
                  Prenom : ${this.prenom}<br>
                  Email : ${this.email}<br>
                  Tel : ${this.tel}<br>
                  Cp : ${this.cp}<br>
                  Ville : ${this.ville}<br>
                  Message : ${this.msg}<br>`;

      var SES = require("aws-sdk/clients/ses");
      var ses = new SES({
        accessKeyId: sesinfos.accessKeyId,
        secretAccessKey: sesinfos.secretAccessKey,
        apiVersion: "2010-12-01",
        region: "eu-west-1"
      });

      var params = {
        Destination: {
          ToAddresses: [sesinfos.ToAddresses]
        },
        Message: {
          Body: {
            Html: {
              Data: mess,
              Charset: "utf-8"
            },
            Text: {
              Data: mess,
              Charset: "utf-8"
            }
          },
          Subject: {
            Data: sesinfos.Subject,
            Charset: "utf-8"
          }
        },
        Source: sesinfos.Source
      };
      ses.sendEmail(params, function(err, data) {
        if (err) console.log(err, err.stack);
        // an error occurred
        else {
          //console.log(data);
          router.push({ name: "post" });
        } // successful response
      });
    }
  }
};
</script>


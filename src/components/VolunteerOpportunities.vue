<template>
  <div id="section2" class="mt-4">
    <h3 class="my-4">I'm Interested In Helping HCM</h3>
    <div class="form-check">
      <label class="form-check-label">
        <input v-model="user_data.email_subscribe" name="email_subscribe" class="form-check-input mr-2" type="checkbox" value="">
        Subscribe for email updates
      </label>
    </div>
    <div class="form-check">
      <label class="form-check-label">
        <input v-model="user_data.prayer_partner" name="prayer_partner" class="form-check-input mr-2" type="checkbox" value="">
        Prayer Partner
      </label>
    </div>
    <div class="form-check">
      <label class="form-check-label">
        <input v-model="user_data.volunteer" name="volunteer" class="form-check-input mr-2" type="checkbox" value="">
        Volunteer
      </label>
    </div>
    <div class="form-check pl-4">
      <label class="form-check-label">
        <input v-model="user_data.noah" name="noah" class="form-check-input mr-2" type="checkbox" value="">
        Noah After School (Grades 1-5)
      </label>
    </div>
    <div class="form-check pl-4">
      <label class="form-check-label">
        <input v-model="user_data.younglife" name="younglife" class="form-check-input mr-2" type="checkbox" value="">
        Younglife (Grades 9-12)
      </label>
    </div>
    <div class="form-check pl-5">
      <label class="form-check-label">
        <input v-model="user_data.field_trips" name="field_trips" class="form-check-input mr-2" type="checkbox" value="">
        Host student field trips
      </label>
    </div>
    <div class="form-check pl-4">
      <label class="form-check-label">
        <input v-model="user_data.cooking" name="cooking" class="form-check-input mr-2" type="checkbox" value="">
        Cooking / Donating Meals
      </label>
    </div>
    <div class="form-check pl-4">
      <label class="form-check-label">
        <input v-model="user_data.maintenance" name="maintenance" class="form-check-input mr-2" type="checkbox" value="">
        Service Projects (i.e. building repairs, painting, etc)
      </label>
    </div>
    <div class="form-check pl-4">
      <label class="form-check-label">
        <input v-model="user_data.administration" name="administration" class="form-check-input mr-2" type="checkbox" value="">
        Administration (i.e. mailings, etc)
      </label>
    </div>
    <div class="form-check pl-4">
      <label class="form-check-label">
        <input v-model="user_data.event_planning" name="event_planning" class="form-check-input mr-2" type="checkbox" value="">
        Event Planning
      </label>
    </div>
    <div class="form-check pl-4">
      <label class="form-check-label">
        <input v-model="user_data.table_host" name="table_host" class="form-check-input mr-2" type="checkbox" value="">
        Table Host at Annual Gala
      </label>
    </div>
    <div class="form-check pl-4">
      <label class="form-check-label">
        <input v-model="user_data.silent_auction" name="silent_auction" class="form-check-input mr-2" type="checkbox" value="">
        Contact me about donating a silent auction item
      </label>
    </div>
    <div class="form-check">
      <label class="form-check-label">
        <input v-model="user_data.contact_me" name="contact_me" class="form-check-input mr-2" type="checkbox" value="">
        Please Contact Me
      </label>
    </div>
    <h3 class="my-3">I Can Help Spread The Word About HCM</h3>
    <div class="form-check">
      <label class="form-check-label">
        <input v-model="user_data.tell_friends" name="tell_friends" class="form-check-input mr-2" type="checkbox" value="">
        I'd like to tell my friends about HCM
      </label>
    </div>
    <div class="form-check">
      <label class="form-check-label">
        <input v-model="user_data.tell_church" name="tell_church" class="form-check-input mr-2" type="checkbox" value="">
        I'd like to talk to my church about supporting HCM
      </label>
    </div>
    <div class="form-row">
      <div class="col">
        <label for="other_input">Other</label>
        <input v-model="user_data.other" class="form-control" id="other_input" type="text">
      </div>
    </div>
    <div class="form-row">
      <div class="col-md-4 my-3">
        <button v-on:click="back" class="btn btn-light">Back</button>
        <button v-on:click="submit" class="btn btn-primary">Submit</button>
      </div>
    </div>
    <br/><br/>
  </div>
</template>

<script>
import axios from 'axios';
import ScreenOverlay from './ScreenOverlay';

export default {
  components: {
    ScreenOverlay,
  },
  data() {
    return {
      display: false,
      user_data: {
        email_subscribe: false,
        prayer_partner: false,
        volunteer: false,
        noah: false,
        nehemiah: false,
        younglife: false,
        field_trips: false,
        cooking: false,
        maintenance: false,
        administration: false,
        event_planning: false,
        table_host: false,
        silent_auction: false,
        contact_me: false,
        tell_friends: false,
        tell_church: false,
        other: '',
      },
    };
  },
  methods: {
    back() {
      this.$router.push('/');
    },
    submit() {
      var user_id = this.$cookie.get('user_id');
      axios.put(`/api/v1/user/${user_id}`, this.user_data)
        .then((res) => {
          if (res.data.status === 'success') {
            // humane.log(
              // 'Thanks! Successfully Submitted.',
              // {addnCls: 'humane-flatty-success'}
            // )
            return axios.get('/api/v1/flowstatus');
          }
          return 0;
        })
        .then((res) => {
          if (res.data.status > 2) {
            this.$router.push('/donations');
          } else {
            this.overlay_toggle();
          }
        });
    },
    overlay_toggle: function overlay_toggle() {
      this.overlay = !this.overlay;
    },
  },
  beforeCreate() {
    var user_id = this.$cookie.get('user_id');
    axios.get(`/api/v1/user/${user_id}`)
      .then((res) => {
        this.user_data.email_subscribe = res.data.email_subscribe;
        this.user_data.prayer_partner = res.data.prayer_partner;
        this.user_data.volunteer = res.data.volunteer;
        this.user_data.noah = res.data.noah;
        this.user_data.nehemiah = res.data.nehemiah;
        this.user_data.younglife = res.data.younglife;
        this.user_data.field_trips = res.data.field_trips;
        this.user_data.cooking = res.data.cooking;
        this.user_data.maintenance = res.data.maintenance;
        this.user_data.administration = res.data.administration;
        this.user_data.event_planning = res.data.event_planning;
        this.user_data.table_host = res.data.table_host;
        this.user_data.silent_auction = res.data.silent_auction;
        this.user_data.contact_me = res.data.contact_me;
        this.user_data.tell_friends = res.data.tell_friends;
        this.user_data.tell_church = res.data.tell_church;
        this.user_data.other = res.data.other;
      });
  },
  created() {
    // var self = this;
    // EventBus.$on('section1-next', function(data){
      // self.display = true;
      // window.scroll(0,0);
    // });
    // EventBus.$on('section3-back', function(data){
      // self.display = true;
      // window.scroll(0,0);
    // });
  },
};
</script>

<style scoped>
</style>

<template>
  <div v-if="display" id="section1" class="mt-4">
    <div class="form-group form-row">
      <div class="col">
        <label for="fname_input">First Name</label>
        <input v-model="first_name" name="first_name" class="form-control" id="fname_input" type="text" placeholder="First Name">
      </div>
      <div class="col">
        <label for="lname_input">Last Name</label>
        <input v-model="last_name" name="last_name" class="form-control" id="lname_input" type="text" placeholder="Last Name">
      </div>
    </div>
    <div class="form-group">
      <label for="lname_input">Business / Org Name</label>
      <input v-model="business_name" name="business_name" class="form-control" id="lname_input" type="text" placeholder="Travelers">
    </div>
    <div class="form-group">
      <label for="email_input">Email</label>
      <input v-model="email" name="email" class="form-control" id="email_input" type="text" placeholder="you@gmail.com">
    </div>
    <div class="form-group">
      <label for="phone_input">Phone</label>
      <input v-model="phone" name="phone" class="form-control" id="phone_input" type="text" placeholder="8601231234">
    </div>
    <div class="form-group">
      <label for="address_input">Address</label>
      <input v-model="address" name="address" class="form-control" id="address_input" type="text" placeholder="111 Imaginary Dr">
    </div>
    <div class="form-row">
      <div class="col-md-6">
        <label for="city_input">City</label>
        <input v-model="city" name="city" class="form-control" id="city_input" type="text" placeholder="Hartford">
      </div>
      <div class="col-md-3">
        <label for="state_input">State</label>
        <input v-model="state" name="state" class="form-control" id="state_input" type="text" placeholder="CT">
      </div>
      <div class="col-md-3">
        <label for="zipcode_input">Zip</label>
        <input v-model="zipcode" name="zipcode" class="form-control" id="zipcode_input" type="text" placeholder="06112">
      </div>
    </div>
    <div class="form-row">
      <div class="col-md-2">
        <button v-on:click="submit" class="btn btn-primary my-3">Submit</button>
      </div>
    </div>
    <br/><br/>
	</div>
</template>

<script>
import axios from 'axios';
import EventBus from '../bus';

export default {
  el: '#section1',
  data() {
    return {
      display: true,
      first_name: '',
      last_name: '',
      business_name: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      zipcode: '',
    };
  },
  methods: {
    next: function next() {
      var self = this;
      var next = false;
      axios.get('/api/v1/flowstatus')
        .then((res) => {
        })
    },
    submit: function submit() {
      var self = this;
      var user_id = this.$cookie.get('user_id');
      axios.put(`/api/v1/user/${user_id}`, self.$data)
        .then((res) => {
          if (res.data.status == 'success'){
            humane.log(
              'Thanks! Successfully Submitted.',
              { addnCls: 'humane-flatty-success' },
            );
            return axios.get('/api/v1/flowstatus');
          }
        })
        .then((res) => {
          if (res.data.status > 1) {
            self.display = false;
            window.scroll(0, 0);
            EventBus.$emit('section1-next', true);
          } else {
            // overlay_on();
          }
        });
    },
  },
  beforeCreate: function bc() {
    var self = this;
    var UserId = this.$cookie.get('user_id');
    axios.get(`/api/v1/user/${UserId}`)
      .then((res) => {
        self.$data.first_name = res.data.first_name;
        self.$data.last_name = res.data.last_name;
        self.$data.business_name = res.data.business_name;
        self.$data.email = res.data.email;
        self.$data.phone = res.data.phone;
        self.$data.address = res.data.address;
        self.$data.city = res.data.city;
        self.$data.state = res.data.state;
        self.$data.zipcode = res.data.zipcode;
      });
  },
  created: function c() {
    var self = this;
    EventBus.$on('section2-back', () => {
      self.display = true;
      window.scroll(0, 0);
    });
  },
};
</script>

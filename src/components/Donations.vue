<template>
  <div v-show="display" id="section3" style="display:none;">
    <p>Do you currently give to HCM monthly?</p>
    <div class="form-group">
      <div class="form-check form-check-inline">
        <div class="form-check-label">
          <input v-model="currently_give" value="true" class="form-check-input" type="radio"> Yes
        </div>
      </div>
      <div class="form-check form-check-inline">
        <div class="form-check-label">
          <input v-model="currently_give" value="" class="form-check-input" type="radio"> No
        </div>
      </div>
    </div>

    <div v-if="currently_give === ''" class="form-row my-3">
      <div class="col-md-2 my-2">
        <label for="one_time_input">One Time Donation</label>
        <div class="input-group">
          <span class="input-group-addon">$</span>
          <input v-model="one_time_donation" class="form-control" id="one_time_input" type="number">
        </div>
      </div>
      <div class="col-md-2 my-2">
        <label for="monthly_input">Monthly Donation</label>
        <div class="input-group">
          <span class="input-group-addon">$</span>
          <input v-model="monthly_donation" class="form-control" id="monthly_input" type="number">
        </div>
      </div>
    </div>

    <div v-if="currently_give === 'true'">
      Are you renewing your commitment (in full or in part) for another year?
      <div class="form-group">
        <div class="form-check form-check-inline">
          <div class="form-check-label">
            <input v-model="renewal" value="true" class="form-check-input" type="radio"> Yes
          </div>
        </div>
        <div class="form-check form-check-inline">
          <div class="form-check-label">
            <input v-model="renewal" value="" class="form-check-input" type="radio"> No
          </div>
        </div>
      </div>

      <div v-if="renewal === ''">
        <div class="col-md-3 my-2">
          <label for="one_time_input">One Time Donation</label>
          <div class="input-group">
            <span class="input-group-addon">$</span>
            <input v-model="one_time_donation" class="form-control" id="one_time_input" type="number">
          </div>
        </div>
        <p>We're so sorry to lose you as a donor. May we contact you to discuss your decision?</p>
        <div class="form-group">
          <div class="form-check form-check-inline">
            <div class="form-check-label">
              <input v-model="discuss_decision" value="true" class="form-check-input" type="radio"> Yes
            </div>
          </div>
          <div class="form-check form-check-inline">
            <div class="form-check-label">
              <input v-model="discuss_decision" value="" class="form-check-input" type="radio"> No
            </div>
          </div>
        </div>
      </div>

      <div v-if="renewal === 'true'">
        <div class="form-row my-3">
          <div class="col-md-3 my-2">
            <label for="one_time_input">One Time Donation</label>
            <div class="input-group">
              <span class="input-group-addon">$</span>
              <input v-model="one_time_donation" class="form-control" id="one_time_input" type="number">
            </div>
          </div>
          <div class="col-md-3 my-2">
            <label for="monthly_input">Current Monthly Donation</label>
            <div class="input-group">
              <span class="input-group-addon">$</span>
              <input v-model="monthly_donation" class="form-control" id="monthly_input" type="number">
            </div>
          </div>
        </div>
        <div v-show="renewal" class="form-check my-2">
          <label class="form-check-label">
            <input v-model="increase_donation" class="form-check-input mr-2" type="checkbox" value="">
            Would you consider increasing your donation this year?
          </label>
        </div>
        <div v-show="increase_donation">
          <div class="form-row my-3">
            <div class="col-md-4 my-2">
              <div class="input-group">
                <span class="input-group-addon">$</span>
                <input v-model="renewal_increase" class="form-control" id="renewal_increase_input" type="number">
              </div>
            </div>
          </div>
          <label>Increase last years amount by % or enter in a new amount above</label><br/>
          <div class="form-row text-center my-2">
            <button v-on:click="increase(10)" type="button" class="btn btn-info ml-2">10%</button>
            <button v-on:click="increase(20)" type="button" class="btn btn-info ml-2">20%</button>
            <button v-on:click="increase(50)" type="button" class="btn btn-info ml-2">50%</button>
            <button v-on:click="increase(100)" type="button" class="btn btn-info ml-2">100%</button>
          </div>
          <label class="my-2"><strong>New total monthly commitment: ${{ total_monthly }}</strong></label>
        </div>
      </div>

    </div>
    <div class="form-row">
      <div class="col-md-4 my-3">
        <button v-on:click="back" class="btn btn-light">Back</button>
        <button v-on:click="submit" class="btn btn-primary">Submit</button>
      </div>
    </div>
    <div class="form-row">
      <p class="muted">NOTE: If you resubmit you will <b>not</b> create a new submission. It will update the info from your previous submission</p>
    </div>

  </div>
</template>

<script>
var section3 = new Vue({
  el: '#section3',
  data: {
    display: false,
    currently_give: false,
    one_time_donation: "",
    monthly_donation: "",
    renewal: false,
    renewal_increase: "",
    increase_donation: false,
    discuss_decision: false,
  },
  computed: {
    total_monthly: function(){
      var md = parseInt(this.$data.monthly_donation);
      var ri = parseInt(this.$data.renewal_increase);
      if (isNaN(md)) md = 0;
      if (isNaN(ri)) ri = 0;
      return md + ri;
    },
  },
  methods: {
    test: function(){
      if (this.$data.increase_donation){
        this.$data.renewal_increase = 0;
        this.$data.increase_donation = false;
      }
    },
    submit: function(){
      var user_id = get_cookie('user_id');
      axios.put(`/api/v1/user/${user_id}/donations`, this.$data)
        .then(function(res){
          if (res.data.status == 'success'){
            humane.log(
              'Thanks! Successfully Submitted.',
              {addnCls: 'humane-flatty-success'}
            )
          }
        });
    },
    next: function(){
      var self = this;
      axios.get('/api/v1/flowstatus')
        .then(function(res){
          if (res.data.status > 3){
            self.display = false;
            EventBus.$emit('section3-next', true);
          } else {
            overlay_on();
          }
        })
    },
    back: function(){
      this.display = false;
      EventBus.$emit('section3-back', true);
    },
    increase: function(percent){
      this.$data.renewal_increase = Math.round(this.$data.monthly_donation*(.01*percent));
    },
  },
  beforeCreate: function(){
    var self = this;
    var user_id = get_cookie('user_id');
    axios.get(`/api/v1/user/${user_id}/donations`)
      .then(function(res){
        self.$data.one_time_donation = res.data.one_time_donation == 0 ? "" : res.data.one_time_donation;
        self.$data.monthly_donation = res.data.monthly_donation == 0 ? "" : res.data.monthly_donation;
        self.$data.renewal = res.data.renewal;
        self.$data.renewal_increase = res.data.renewal_increase;
        self.$data.increase_donation = res.data.increase_donation;
      });
  },
  created: function(){
    var self = this;
    EventBus.$on('section2-next', function(data){
      self.display = true;
      window.scroll(0,0);
    });
  },
})
</script>

<style scoped>
</style>

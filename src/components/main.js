var EventBus = new Vue();

// --------------------------------
// -----    Section 1      --------
// --------------------------------


// --------------------------------
// -----    Section 2      --------
// --------------------------------

var section2 = new Vue({
  el: '#section2',
  data: {
    display: false,
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
    other: "",
  },
  methods: {
    back: function(){
      this.display = false;
      EventBus.$emit('section2-back', true);
    },
    submit: function(){
      var self = this;
      var user_id = get_cookie('user_id');
      axios.put(`/api/v1/user/${user_id}`, self.$data)
        .then(function(res){
          if (res.data.status == 'success'){
            humane.log(
              'Thanks! Successfully Submitted.',
              {addnCls: 'humane-flatty-success'}
            )
            return axios.get('/api/v1/flowstatus');
          }
        })
        .then(function(res){
          if (res.data.status > 2){
            self.display = false;
						window.scroll(0,0);
            EventBus.$emit('section2-next', true);
          } else {
            overlay_on();
          }
        });
    },
  },
  beforeCreate: function(){
    var self = this;
    var user_id = get_cookie('user_id');
    axios.get(`/api/v1/user/${user_id}`)
      .then(function(res){
        self.$data.email_subscribe = res.data.email_subscribe
        self.$data.prayer_partner = res.data.prayer_partner
        self.$data.volunteer = res.data.volunteer
        self.$data.noah = res.data.noah
        self.$data.nehemiah = res.data.nehemiah
        self.$data.younglife = res.data.younglife
        self.$data.field_trips = res.data.field_trips
        self.$data.cooking = res.data.cooking
        self.$data.maintenance = res.data.maintenance
        self.$data.administration = res.data.administration
        self.$data.event_planning = res.data.event_planning
        self.$data.table_host = res.data.table_host
        self.$data.silent_auction = res.data.silent_auction
        self.$data.contact_me = res.data.contact_me
        self.$data.tell_friends = res.data.tell_friends
        self.$data.tell_church = res.data.tell_church
        self.$data.other = res.data.other
      })
  },
  created: function(){
    var self = this;
    EventBus.$on('section1-next', function(data){
      self.display = true;
			window.scroll(0,0);
    });
    EventBus.$on('section3-back', function(data){
      self.display = true;
			window.scroll(0,0);
    });
  },
})

// --------------------------------
// -----    Section 3      --------
// --------------------------------

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

const ProjectStore = require('../stores/project_store');
const ProjectMembershipActions = require('../actions/project_membership_actions');
const SessionStore = require('../stores/session_store');

var _channels = {};

module.exports = {
  pusher: {},

  addChannels: function() {
    this.pusher = new Pusher('4b389f8a160265cfaaa3', {
    authEndpoint: '/pusher/auth',
    auth: {
      headers: {
        'X-CSRF-Token': "<%= form_authenticity_token %>"
        }
      }
    });

    let user = SessionStore.getCurrentUser();

    Object.keys(ProjectStore.all()).forEach((channelId) => {
      if (!_channels[`project_${channelId}`]){
        let channel = this.pusher.subscribe(`presence-project_${channelId}`);
        _channels[`project_${channelId}`] = channel;
        channel.bind('pusher:subscription_succeeded', function () {

          channel.trigger('client-update_online_status', {
            user_id: user.id,
            username: user.username,
            email: user.email
          });


        });
      }
    });
  },

  removeChannels: function () {
    Object.keys(_channels).forEach((channelId)=>{
      this.pusher.unsubscribe(channelId);
    });
  },

  getChannel: function(channelId) {
    return _channels[channelId];
  }


};

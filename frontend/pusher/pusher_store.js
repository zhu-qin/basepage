const ProjectStore = require('../stores/project_store');
const SessionStore = require('../stores/session_store');

let _channels = {};
let _listeners = [];
let _pusher;

const PusherStore = {
  getAuthToken: function (){
    if (!_pusher){
      $.ajax({
        method: "GET",
        url: `/pusher/get_auth_token`,
        dataType: "TEXT"
      })
      .done((response) => {
        _pusher = new Pusher('4b389f8a160265cfaaa3', {
          authEndpoint: '/pusher/auth',
          auth: {
            headers: {
              'X-CSRF-Token': `${response}`
              }
            }
        });
        PusherStore.addChannels();
      })
      .fail((res, err) => {
        console.log(err);
      });
    }
  },

  addChannels: function() {
    Object.keys(ProjectStore.all()).forEach((channelId) => {
      let project_id = `presence-project_${channelId}`;
      let channel = _pusher.subscribe(project_id);
      _channels[project_id] = channel;
      // channel.bind("pusher:subscription_succeeded", (data) => {
      //   console.log(data);
      // });
    });
  },

  removeChannels: function () {
    Object.keys(_channels).forEach((channelId)=>{
      _pusher.unsubscribe(channelId);
    });
  },

  getChannelForCurrentProject: function() {
    return _channels[`presence-project_${ProjectStore.getCurrentProject().id}`];
  },

  addPusherListener: function (listener) {
    let listenersLength = _listeners.length;
    _listeners.push(listener);

    return {
      remove: function() {
        delete _listeners[listenersLength];
      }
    };
  },

  getOnlineMembers: function() {
    return _channels[`presence-project_${ProjectStore.getCurrentProject().id}`].members.members;
  },

  triggerCallbacks: function () {
    _listeners.forEach((callback)=>{
      callback();
    });
  }

};

module.exports = PusherStore;

const ProjectStore = require('../stores/project_store');
const SessionStore = require('../stores/session_store');

let _channels = {};
let _listeners = [];

const PusherStore = {

  pusher: new Pusher('4b389f8a160265cfaaa3', {
    authEndpoint: '/pusher/auth',
    auth: {
      headers: {
        'X-CSRF-Token': "<%= form_authenticity_token %>"
        }
      }
  }),

  addChannels: function() {
    Object.keys(ProjectStore.all()).forEach((channelId) => {
      let project_id = `presence-project_${channelId}`;
      let channel = PusherStore.pusher.subscribe(project_id);
      _channels[project_id] = channel;
      // channel.bind("pusher:subscription_succeeded", (data) => {
      //
      // });
    });
  },

  removeChannels: function () {
    Object.keys(_channels).forEach((channelId)=>{
      PusherStore.pusher.unsubscribe(channelId);
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

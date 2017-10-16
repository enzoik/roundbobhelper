define(function(require, exports, module) {
  "use strict";

  module.exports = {
    storageKey: 'rb-state-storage-key',

    initState: {
      auth: {
        id: null,
        name: null,
        email: null,
        username: null,
        authToken: null,
      },
      hotels:{},
      flights:{},
      packages:{},
    },

    state: {},

    loadState: function(){
      try {
    		var serializedState = localStorage.getItem(this.storageKey);
    		if(serializedState === null) {
    			return this.saveState(this.initState) || undefined;
    		}
        this.state = JSON.parse(serializedState);
    		return this.state;
    	}catch (err){
    		return undefined;
    	}
    },

    saveState: function(){
      try{
    		var serializedState = JSON.stringify(this.state);
    		localStorage.setItem(this.storageKey,serializedState);
        return state;
    	}catch(error){
    		// ignore
    	}
      return false;
    },

    clearState: function(){
      try{
    		localStorage.removeItem(this.storageKey);
    	}catch(error){
    		// ignore
    	}
    }
  };
});

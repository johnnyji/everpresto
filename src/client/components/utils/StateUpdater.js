const StateUpdater = {
  setStateOptionImmutable(state) {
    return (option, value) => {
      return state.set(option, value);
    };  
  },

  updateStateImmutable(state) {
    return (newState) => {
      return state.merge(newState)
    };
  }
};

export default StateUpdater;
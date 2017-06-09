import { combineReducers } from 'redux';
/*

votes:{
  voted:true,
  total:1
}

currAPOD = {
  APOD_ref:1,
  votes:2,
  comments:{
    comm_buff:'Nice p',
    [{
      user:anonymous,
      comment:'Edi meow'
    },
    {
      user_ref:0,
      comment:'Edi cow!'
    }]}
}
*/

const currAPOD = (state = {}, action) => {
  switch (action.type) {
    case "EXEC_INIT":
      return Object.assign({}, state, {
        votes:Object.assign({}, currVotes(undefined, action)),
        comments:Object.assign({}, currComments(state.comments, action))
      });
    case "SET_VOTES":
      return Object.assign({}, state, {votes:Object.assign({}, currVotes(undefined, action))});
    case "WRITE_COMMENT":
      return Object.assign({}, state, {comments:Object.assign({}, currComments(state.comments, action))});
    case "ADD_COMMENT":
      return Object.assign({}, state, {comments:Object.assign({}, currComments(state.comments, action))});
    case "ADD_JSON":
    case "SET_REF":
      return Object.assign({}, state, {APOD_ref:action.id});
    case "APOD_LOADING":
      return Object.assign({}, state, {loading:action.status});
    default:
      return state;
  }
}

    const currVotes = (state = {}, action) => {
      switch (action.type) {
        case "EXEC_INIT":
        case "SET_VOTES":
          return Object.assign({}, {voted:action.votes.voted, total:action.votes.total})
        default:
          return state;
      }
    }

    const currComments = (state = {}, action) => {
      switch (action.type){
        case "EXEC_INIT":
        console.log("Log action ",action);
          return Object.assign({}, state, {
            comm_buff:action.comm_buff,
            container:action.comments
          });
        case "WRITE_COMMENT":
          return Object.assign({}, state, {comm_buff:action.comm_buff});
        case "ADD_COMMENT":
          return Object.assign({}, state, {container:currComment(state.container, action)});
        default:
          return state;
      }
    }

    const currComment = (state = [], action) => {
      switch (action.type){
        case "ADD_COMMENT":
          return [...state, Object.assign({}, action.comment, {key:state.length})];
        default:
          return state;
      }
    }

const jsonStash = (state = [], action) => {
  switch (action.type) {
    case "ADD_JSON":
      return [...state, action.json];
    default:
      return state;
  }
}

/*

currSession = {

  today:2017-01-01,
  logged:false,
  acc_ref:0,
  // request: {
  //   requesting:true,
  //   reqDate:2017-01-02
  // }
  Comp:Start
  requesting: 2017-01-01

}

*/

const currSession = (state = {}, action) => {
  switch (action.type) {
    case "SET_USER":
      return Object.assign({}, state, {acc_ref:action.user_ref, logged:action.logged});
    case "INIT_TODAY":
      console.log("Init today");
      return Object.assign({}, state, {today:action.date, requesting:action.date});
    case "SET_REQ":
      return Object.assign({}, state, {requesting:action.val});
    case "SET_TITLE":
      return Object.assign({}, state, {Comp:action.title});
    default:
      return state;
  }
}

/*

  archives:[
    {
      date:date(Object),
      APOD:{}(CurrentAPOD)
    }
  ]

*/

const archives = (state = [], action) => {
  switch (action.type){
    case "PUSH_APOD":
      return [
        ...state,
        archive(undefined, action)
      ];
    case "REPL_APOD":
      return [...state.slice(0,action.index),
              archive(undefined, action),
              ...state.slice(action.index + 1)];
    default:
      return state;
  }
}

const archive = (state = {}, action) => {
  switch (action.type){
    case "PUSH_APOD":
    case "REPL_APOD":
      return action.APOD
    default:
      return state;
  }
}

const combinedReducers = combineReducers({
  currAPOD,
  jsonStash,
  currSession,
  archives
});

export default combinedReducers;

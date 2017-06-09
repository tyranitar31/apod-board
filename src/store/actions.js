import xhr from 'xhr';
import {database, auth} from '../database';

var stashID = 0;

export function initSession(){
  return function thunk(dispatch){
    dispatch(initToday());
    dispatch(initUser());
  }
}

export function setTitle(title){
  return {
    type:"SET_TITLE",
    title
  };
}

export function initUser(user_ref){
  return function thunk(dispatch){
    dispatch(setUser(user_ref, user_ref !== undefined));
    console.log("user init");
  }
}

export function setReq(val){
  return {
    type:"SET_REQ",
    val
  };
}

export function setLog(logged){
  return {
    type:"SET_IF_LOGGED",
    logged
  };
}

export function setSessName(acctName){
  return{
    type:"SET_SESSION_NAME",
    acctName
  };
}

export function signupReq(email,pass,fname,lname){
  return function thunk(dispatch){
    auth.createUserWithEmailAndPassword(email,pass)
    .then((user)=> {
      console.log("saveuserinfo ",fname);
      database.ref().child('user/'+user.uid+'/info')
      .set({
        email:user.email,
        uid:user.uid,
        fname:fname,
        lname:lname
      })
      .then(dispatch(setUser(user.id, true)));
    })
    .catch(err => {
      console.log("Error "+err.code);
      console.log(err.message);
    });
  }
}

export function saveUserInfo(user,fname,lname){
  return function thunk(dispatch){

  }
}

export function setUser(user_ref, logged){
  return {
    type:"SET_USER",
    user_ref,
    logged
  };
}

export function initToday(){
  return function thunk(dispatch){
    const date = new Date();
    const today = date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate();
    dispatch(setToday(today));
  }
}

export function setToday(date){
  return {
    type: "INIT_TODAY",
    date
  };
}

export function upVote(votes){
  return {
    type:"VOTE_UP",
    votes
  }
}

export function onVote(curr, voted){
  return function thunk(dispatch){
    var inc = voted?-1:1;
    dispatch(setVote({voted:!voted, total:curr+inc}));
  }
}

export function dwnVote(votes){
  return {
    type:"VOTE_DWN",
    votes
  }
}

export function setVote(votes){
  return {
    type:"SET_VOTES",
    votes
  }
}

//

export function writeComment(comm_buff){
  return {
    type:"WRITE_COMMENT",
    comm_buff
  }
}

export function constructComment(name, comment){
  return function thunk(dispatch){
    console.log("Dispatch Comment",{name, comment});
    dispatch(writeComment(""));
    dispatch(addComment({name, comment}))
  }
}

export function addComment(comment){
  return {
    type:"ADD_COMMENT",
    comment
  }
}

export function APODLoading(status){
  return {
    type:"APOD_LOADING",
    status
  }
}

export function initAPOD(date,inStash,inArchive){
  return function thunk(dispatch){
    var votes = inArchive.index == -1?{voted:false,total:0}:inArchive.APOD[0].APOD.votes;
    var comments = inArchive.index == -1?[]:inArchive.APOD[0].APOD.comments.container;
    console.log("Check archive : ", inArchive);
    dispatch(APODLoading(true));
    if(inStash == -1)
      dispatch(requestData(date));
    else
      dispatch(setRef(inStash));
    database.ref('votes/'+date).once('value').then(snap => {
      console.log("DB ",snap.val());
      if(snap.val()){
        console.log("Not empty", snap.val());
        votes = {voted:false, total:snap.val()};
      } else {
        database.ref('votes').child(date).set(0);
      }
      dispatch(execInit(date, votes, "", comments));
      dispatch(APODLoading(false));
    });
  }
}

export function execInit(dateReq, votes, comm_buff, comments){
  return {
    type:"EXEC_INIT",
    dateReq,
    votes,
    comm_buff,
    comments
  };
}

export function requestData(date){
  return function thunk(dispatch){
    var url =   "https://api.nasa.gov/planetary/apod?api_key=eeuMFI0lj6lPDeCrsX1FwobAIHHjhbcnvUF6CBGe&&date="
                  +date;
                  //HCnZrQb5meotwyg0IECkeIxoA979VWSKKfxcTQf0

    console.log("Url request of "+url);

    xhr({
      url:url
    },function(err,data) {
      console.log("Incrementing from "+stashID);
      var json = JSON.parse(data.body);
      if(json.code === undefined)
        dispatch(addToStash(json, stashID++));
      else
        dispatch(setRef(-1));
    });
  };
}

export function setRef(id){
  return {
    type:"SET_REF",
    id
  }
}

export function addToStash(json, id){
  return {
    type:"ADD_JSON",
    json,
    id
  }
}

export function replaceAPOD(index, APOD){
  return {
    type:"REPL_APOD",
    index,
    APOD
  };
}

export function saveToArchive(date, APOD, inArchive){
  return function thunk(dispatch){
    if(inArchive.APOD.length == 0){
      console.log("New APOD");
      dispatch(pushAPOD({date:date, APOD:APOD}));
    }
    else{
      console.log("Old APOD");
      dispatch(replaceAPOD(inArchive.index, Object.assign({},inArchive.APOD[0],{APOD:APOD})));
    }
  }
}

export function pushAPOD(APOD){
  return {
    type:"PUSH_APOD",
    APOD
  };
}

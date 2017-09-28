var MongoClient = require('mongodb').MongoClient;
var uri = "mongodb://admin:admin@cluster0-shard-00-00-5mlyc.mongodb.net:27017,cluster0-shard-00-01-5mlyc.mongodb.net:27017,cluster0-shard-00-02-5mlyc.mongodb.net:27017/admin";
var options = {
  ssl: true,
  replicaSet: 'Cluster0-shard-0',
  authSource: 'admin',
  keepAlive: 1,
  connectTimeoutMS: 30000
};
var vowelArr = "aeiou";
var consenantArr = "bcdfghjklmnpqrstvwxyz";
var words = "the,be,and,of,a,in,to,have,it,I,that,for,you,he,with,on,do,don't,won't,can't,shouldn't,say,this,they,at,but,we,his,from,not,by,she,or,as,what,go,their,can,who,get,if,would,her,all,my,make,about,know,will,up,one,time,there,year,so,think,when,which,them,some,me,people,take,out,into,just,see,him,your,come,could,now,than,like,other,how,then,its,our,two,more,these,want,way,look,first,also,new,because,day,use,no,man,find,here,thing,give,many,well,only,those,tell,very,even,back,any,good,woman,through,us,life,child,work,down,may,after,should,call,world,over,school,still,try,last,ask,need,too,feel,three,state,never,become,between,high,really,something,most,another,much,family,own,leave,put,old,while,mean,keep,student,why,let,great,same,big,group,begin,seem,country,help,talk,where,turn,problem,every,start,hand,might,American,show,part,against,place,such,again,few,case,week,company,system,each,right,program,hear,question,during,play,government,run,small,number,off,always,move,night,live,Mr,point,believe,hold,today,bring,happen,next,without,before,large,million,must,home,under,water,room,write,mother,area,national,money,story,young,fact,month,different,lot,study,book,eye,job,word,though,business,issue,side,kind,four,head,far,black,long,both,little,house,yes,since,provide,service,around,friend,important,father,sit,away,until,power,hour,game,often,yet,line,political,end,among,ever,stand,bad,lose,however,member,pay,law,meet,car,city,almost,include,continue,set,later,community,name,five,once,white,least,president,learn,real,change,team,minute,best,several,idea,kid,body,information,nothing,ago,lead,social,understand,whether,watch,together,follow,parent,stop,face,anything,create,public,already,speak,others,read,level,allow,add,office,spend,door,health,person,art,sure,war,history,party,within,grow,result,open,morning,walk,reason,low,win,research,girl,guy,early,food,moment,himself,air,teacher,force,offer,enough,education,across,although,remember,foot,second,boy,maybe,toward,able,age,policy,everything,love,process,music,including,consider,appear,actually,buy,probably,human,wait,serve,market,die,send,expect,sense,build,stay,fall,oh,nation,plan,cut,college,interest,death,course,someone,experience,behind,reach,local,kill,six,remain,effect,yeah,suggest,class,control,raise,care,perhaps,late,hard,field,else,pass,former,sell,major,sometimes,require,along,development,themselves,report,role,better,economic,effort,decide,rate,strong,possible,heart,drug,leader,light,voice,wife,whole,police,mind,finally,pull,return,free,military,price,less,according,decision,explain,son,hope,develop,view,relationship,carry,town,road,drive,arm,true,federal,break,difference,thank,receive,value,international,building,action,full,model,join,season,society,tax,director,position,player,agree,especially,record,pick,wear,paper,special,space,ground,form,support,event,official,whose,matter,everyone,center,couple,site,project,hit,base,activity,star,table,court,produce,eat,teach,oil,half,situation,easy,cost,industry,figure,street,image,itself,phone,either,data,cover,quite,picture,clear,practice,piece,land,recent,describe,product,doctor,wall,patient,worker,news,test,movie,certain,north,personal,simply,third,technology,catch,step,baby,computer,type,attention,draw,film,Republican,tree,source,red,nearly,organization,choose,cause,hair,century,evidence,window,difficult,listen,soon,culture,billion,chance,brother,energy,period,summer,realize,hundred,available,plant,likely,opportunity,term,short,letter,condition,choice,single,rule,daughter,administration,south,husband,Congress,floor,campaign,material,population,economy,medical,hospital,church,close,thousand,risk,current,fire,future,wrong,involve,defense,anyone,increase,security,bank,myself,certainly,west,sport,board,seek,per,subject,officer,private,rest,behavior,deal,performance,fight,throw,top,quickly,past,goal,bed,order,author,fill,represent,focus,foreign,drop,blood,upon,agency,push,nature,color,recently,store,reduce,sound,note,fine,near,movement,page,enter,share,common,poor,natural,race,concern,series,significant,similar,hot,language,usually,response,dead,rise,animal,factor,decade,article,shoot,east,save,seven,artist,scene,stock,career,despite,central,eight,thus,treatment,beyond,happy,exactly,protect,approach,lie,size,dog,fund,serious";
var wordArr = words.split(",");
var wordObjArr = new Array();
for (var i=0; i<wordArr.length; i++){
  try{
    var word = wordArr[i].toLowerCase();
    var vowelCnt = ("|"+word+"|").split(/[aeiou]/i).length-1;
    var consonantCnt = ("|"+word+"|").split(/[bcdfghjklmnpqrstvwxyz]/i).length-1;
    var letters = [];
    var vowels = [];
    var consonants = [];
    var other = [];
    for (var j=0; j<word.length; j++){
      var ch = word[j];
      if (letters.indexOf(ch) === -1){
        letters.push(ch);
      }
      if (vowelArr.indexOf(ch) !== -1){
        if(vowels.indexOf(ch) === -1){
          vowels.push(ch);
        }
      }else if (consenantArr.indexOf(ch) !== -1){
        if(consonants.indexOf(ch) === -1){
          consonants.push(ch);
        }
      }else{
        if(other.indexOf(ch) === -1){
          other.push(ch);
        }
      }
    }
    var charsets = [];
    if(consonants.length){
      charsets.push({type:"consonants", chars:consonants});
    }
    if(vowels.length){
      charsets.push({type:"vowels", chars:vowels});
    }
    if(other.length){
      charsets.push({type:"other", chars:other});
    }
    var wordObj = {
      word: word,
      first: word[0],
      last: word[word.length-1],
      size: word.length,
      letters: letters,
      stats: { vowels: vowelCnt, consonants: consonantCnt },
      charsets: charsets
    };
    if(other.length){
      wordObj.otherChars = other;
    }
    wordObjArr.push(wordObj);
  } catch (e){
    console.log(e);
    console.log(word);
  }
}
MongoClient.connect(uri, options, function (err, db) {
  var newDB = db.db("words");
  newDB.collections(function (err, collectionObjects) {
    newDB.createCollection("word_stats", function (err, collection) {
      collection.createIndex({word: 1}, {unique: true});
      collection.insert(wordObjArr);
    });
  });
  setTimeout(function(){
    db.close();
  }, 30000);
});
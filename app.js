const STORE='watchtime-pro-v1';
const defaults={name:'',hours:0,subs:0,goal:4000,subgoal:1000,avd:4,daily:300,videos:[]};
let data={...defaults,...JSON.parse(localStorage.getItem(STORE)||'{}')};
const $=id=>document.getElementById(id);
const fmt=n=>Math.max(0,Number(n)||0).toLocaleString(undefined,{maximumFractionDigits:1});
function save(){localStorage.setItem(STORE,JSON.stringify(data));}
function nav(page){document.querySelectorAll('.page').forEach(p=>p.classList.toggle('active',p.id==='page-'+page));document.querySelectorAll('.nav-item').forEach(b=>b.classList.toggle('active',b.dataset.page===page));$('page-title').textContent=({dashboard:'Dashboard',planner:'Growth planner',videos:'Video tracker',seo:'SEO ideas',settings:'Settings'})[page];}
document.querySelectorAll('[data-page]').forEach(b=>b.addEventListener('click',()=>nav(b.dataset.page)));
document.querySelectorAll('[data-go]').forEach(b=>b.addEventListener('click',()=>nav(b.dataset.go)));
function render(){
 $('stat-hours').textContent=fmt(data.hours);$('stat-subs').textContent=fmt(data.subs);$('stat-left').textContent=fmt(Math.max(0,data.goal-data.hours));$('stat-videos').textContent=data.videos.length;
 $('stat-hours-sub').textContent='of '+fmt(data.goal)+' goal';$('stat-subs-sub').textContent='of '+fmt(data.subgoal)+' goal';
 const pct=data.goal>0?Math.min(100,data.hours/data.goal*100):0;$('progress-percent').textContent=pct.toFixed(1)+'%';$('progress-fill').style.width=pct+'%';$('progress-current').textContent=fmt(data.hours)+' hours';
 const avd=Number(data.avd)||4;$('quick-avd').textContent=fmt(avd)+' min';$('quick-views').textContent=fmt(100*60/avd);
 $('s-name').value=data.name;$('s-hours').value=data.hours;$('s-subs').value=data.subs;$('s-goal').value=data.goal;$('s-subgoal').value=data.subgoal;
 $('p-hours').value=data.hours;$('p-goal').value=data.goal;$('p-avd').value=data.avd;$('p-daily').value=data.daily;$('p-subs').value=data.subs;$('p-subgoal').value=data.subgoal;
 renderVideos();calculate();
}
function calculate(){
 const h=Math.max(0,Number($('p-hours').value)||0),g=Math.max(1,Number($('p-goal').value)||4000),avd=Math.max(.01,Number($('p-avd').value)||4),daily=Math.max(0,Number($('p-daily').value)||0),subs=Math.max(0,Number($('p-subs').value)||0),subgoal=Math.max(1,Number($('p-subgoal').value)||1000);
 const left=Math.max(0,g-h),views=left*60/avd,perday=daily*avd/60,days=perday>0?Math.ceil(left/perday):Infinity;
 $('r-views').textContent=fmt(Math.ceil(views));$('r-left').textContent=fmt(left);$('r-perday').textContent=fmt(perday);$('r-days').textContent=Number.isFinite(days)?fmt(days):'—';$('r-needed').textContent=fmt(days===Infinity?0:Math.ceil(views/Math.max(1,days)));$('r-subs').textContent=fmt(Math.max(0,subgoal-subs));
}
$('calculateBtn').addEventListener('click',()=>{data.hours=Number($('p-hours').value)||0;data.goal=Number($('p-goal').value)||4000;data.avd=Number($('p-avd').value)||4;data.daily=Number($('p-daily').value)||0;data.subs=Number($('p-subs').value)||0;data.subgoal=Number($('p-subgoal').value)||1000;save();render();});
['p-hours','p-goal','p-avd','p-daily','p-subs','p-subgoal'].forEach(id=>$(id).addEventListener('input',calculate));
$('saveSettings').addEventListener('click',()=>{data.name=$('s-name').value.trim();data.hours=Math.max(0,Number($('s-hours').value)||0);data.subs=Math.max(0,Number($('s-subs').value)||0);data.goal=Math.max(1,Number($('s-goal').value)||4000);data.subgoal=Math.max(1,Number($('s-subgoal').value)||1000);save();render();alert('Channel figures saved in this browser.');});
function renderVideos(){const body=$('videoRows');if(!data.videos.length){body.innerHTML='<tr><td colspan="6" class="empty">No videos yet. Add your first upload to start tracking.</td></tr>';return;}body.innerHTML=data.videos.map((v,i)=>`<tr><td>${escapeHtml(v.title)}</td><td>${fmt(v.views)}</td><td>${fmt(v.avd)}</td><td>${fmt(v.views*v.avd/60)}</td><td>${escapeHtml(v.format)}</td><td><button class="delete-video" data-delete="${i}">Delete</button></td></tr>`).join('');body.querySelectorAll('[data-delete]').forEach(b=>b.addEventListener('click',()=>{data.videos.splice(Number(b.dataset.delete),1);save();renderVideos();$('stat-videos').textContent=data.videos.length;}));}
function escapeHtml(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
$('addVideoBtn').addEventListener('click',()=>$('videoDialog').showModal());
$('saveVideo').addEventListener('click',e=>{e.preventDefault();const title=$('v-title').value.trim();if(!title){alert('Enter a video title.');return;}data.videos.push({title,views:Math.max(0,Number($('v-views').value)||0),avd:Math.max(0,Number($('v-avd').value)||0),format:$('v-format').value});save();render();$('videoDialog').close();$('videoForm').reset();});
$('seoBtn').addEventListener('click',()=>{const topic=$('seo-topic').value.trim(),aud=$('seo-audience').value.trim(),format=$('seo-format').value;if(!topic){alert('Enter a video topic first.');return;}const title=`${topic} | ${format} for ${aud||'Beginners'}`;const desc=`In this video, we explore ${topic}. Made for ${aud||'viewers interested in this topic'}. Watch to the end, and share a thoughtful comment with your questions.\\n\\nSubscribe for more original ${format.toLowerCase()} content.`;$('seoOutput').classList.remove('hidden');$('seoOutput').innerHTML=`<h4>Title idea</h4><p>${escapeHtml(title)}</p><h4>Description starter</h4><p>${escapeHtml(desc).replace(/\\n/g,'<br>')}</p><h4>Keyword ideas</h4><p>${escapeHtml(topic+', '+format+', '+(aud||'beginner guide')+', how to, explained, tutorial, tips')}</p><button class="outline" id="copySeo">Copy SEO text</button>`;$('copySeo').addEventListener('click',()=>navigator.clipboard?.writeText(title+'\\n\\n'+desc+'\\n\\n'+topic+', '+format+', '+aud));});
$('exportBtn').addEventListener('click',()=>{const blob=new Blob([JSON.stringify(data,null,2)],{type:'application/json'}),a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='watchtime-pro-backup.json';a.click();URL.revokeObjectURL(a.href);});
$('resetBtn').addEventListener('click',()=>{if(confirm('Delete all WatchTime Pro data saved in this browser?')){data={...defaults,videos:[]};save();render();}});
render();nav('dashboard');

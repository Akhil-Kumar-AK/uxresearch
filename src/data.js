export const phases = [
  {name:'Empathize / Research',short:'Research',icon:'heart',color:'#c9865e',description:'Listen closely. Understand the people you’re designing for.'},
  {name:'Define',short:'Define',icon:'focus',color:'#7894c0',description:'Connect the dots and frame the right problem.'},
  {name:'Ideate',short:'Ideate',icon:'bulb',color:'#b39a54',description:'Explore possibilities and make room for unexpected ideas.'},
  {name:'Prototype',short:'Prototype',icon:'layers',color:'#9b85b6',description:'Turn your ideas into something people can experience.'},
  {name:'Test & Validate',short:'Test',icon:'flask',color:'#649c96',description:'Learn what works, what doesn’t, and why.'},
  {name:'Implement & Iterate',short:'Iterate',icon:'repeat',color:'#82946b',description:'Bring it to life. Measure, learn, and keep improving.'}
];
export const templates = [
 {id:'persona',name:'User persona',phase:0,icon:'user',description:'Give your research a human face.',fields:['Name & background','Goals & motivations','Behaviors & habits','Pain points','Needs & opportunities','Supporting evidence']},
 {id:'empathy',name:'Empathy map',phase:0,icon:'heart',description:'See the world through your users’ eyes.',fields:['Says','Thinks','Does','Feels','Pains','Gains']},
 {id:'interview',name:'User interview',phase:0,icon:'chat',description:'Capture conversations that matter.',fields:['Research objective','Participant & context','Interview questions','Notes & observations','Key insights','Consent & follow-up']},
 {id:'survey',name:'Research survey',phase:0,icon:'list',description:'Find patterns across your audience.',fields:['Research question','Audience & sample size','Survey questions','Responses summary','Findings','Limitations']},
 {id:'competitive',name:'Competitive analysis',phase:0,icon:'chart',description:'Understand the landscape around you.',fields:['Competitors','Evaluation criteria','Strengths','Weaknesses','Market gaps','Opportunities']},
 {id:'problem',name:'Problem statement',phase:1,icon:'focus',description:'Get clear on the problem worth solving.',fields:['User / audience','User need','Current barriers','Impact','Problem statement','Success criteria']},
 {id:'journey',name:'User journey map',phase:1,icon:'route',description:'Map every moment in the experience.',fields:['Persona & scenario','Journey stages','Actions & touchpoints','Thoughts & emotions','Pain points','Opportunities']},
 {id:'affinity',name:'Affinity map',phase:1,icon:'grid',description:'Turn observations into meaningful themes.',fields:['Research observations','Theme 1','Theme 2','Theme 3','Patterns & insights','Priorities']},
 {id:'hmw',name:'How might we',phase:2,icon:'bulb',description:'Open the door to new possibilities.',fields:['Problem context','How might we…','Ideas','Assumptions','Selected direction','Next steps']},
 {id:'ia',name:'Information architecture',phase:2,icon:'tree',description:'Bring structure to your experience.',fields:['Content inventory','Primary navigation','Page hierarchy','Labels & taxonomy','Relationships','Validation notes']},
 {id:'flow',name:'User flow',phase:2,icon:'route',description:'Connect intentions to outcomes.',fields:['User goal','Entry points','Steps / screens','Decision points','Error & alternate paths','Success state']},
 {id:'wireframe',name:'Wireframe',phase:3,icon:'layout',description:'Shape your ideas, one screen at a time.',fields:['Screen / feature','Layout & hierarchy','Key components','Interaction notes','Design link','Open questions']},
 {id:'prototype',name:'Interactive prototype',phase:3,icon:'layers',description:'Make the experience tangible.',fields:['Prototype objective','Scope & fidelity','Prototype link','Interactions','Test scenarios','Version notes']},
 {id:'usability',name:'Usability test',phase:4,icon:'flask',description:'Learn by watching people use your design.',fields:['Test objective','Participants','Tasks & scenarios','Observations','Results & metrics','Recommendations']},
 {id:'findings',name:'Validation findings',phase:4,icon:'check',description:'Turn feedback into a clear path forward.',fields:['Hypothesis','Evidence','What worked','Usability issues','Severity & priority','Recommended changes']},
 {id:'handoff',name:'Design handoff',phase:5,icon:'code',description:'Keep the intent intact through delivery.',fields:['Feature scope','Design specifications','Assets & design link','Acceptance criteria','Accessibility requirements','Implementation notes']},
 {id:'iteration',name:'Iteration plan',phase:5,icon:'repeat',description:'Build a habit of continuous improvement.',fields:['Released version','Metrics & outcomes','User feedback','Proposed improvements','Priority & owner','Next review']}
];
export const uid = () => crypto.randomUUID();
export function progress(study) {return study.artifacts.length ? Math.round(study.artifacts.filter(a=>a.status==='Done').length/study.artifacts.length*100) : 0;}
export function metrics(studies){return {total:studies.length,active:studies.filter(s=>s.status==='In progress').length,artifacts:studies.reduce((n,s)=>n+s.artifacts.length,0),completed:studies.filter(s=>s.status==='Completed').length};}
export function validateImport(data){
 if(!data || data.version!==1 || !Array.isArray(data.studies)) throw new Error('Choose a Formative version 1 JSON export.');
 if(data.studies.length>500) throw new Error('Import is limited to 500 case studies.');
 const ids=new Set();
 for(const s of data.studies){
  if(!s || typeof s.id!=='string'||ids.has(s.id)||typeof s.title!=='string'||!s.title.trim()||typeof s.description!=='string'||!['In progress','Completed','On hold'].includes(s.status)||!Number.isInteger(s.phase)||s.phase<0||s.phase>5||!Array.isArray(s.artifacts)||!['sage','peach','lavender','blue','sand','rose'].includes(s.cover)||!Number.isFinite(Date.parse(s.updated)))throw new Error('The export contains an invalid case study.');
  ids.add(s.id);const artifactIds=new Set();
  for(const a of s.artifacts){if(!a||typeof a.id!=='string'||artifactIds.has(a.id)||!templates.some(t=>t.id===a.type)||typeof a.title!=='string'||!a.title.trim()||!['Not started','In progress','Done'].includes(a.status)||!a.values||typeof a.values!=='object'||Array.isArray(a.values)||!Object.values(a.values).every(v=>typeof v==='string'))throw new Error('The export contains an invalid research artifact.');artifactIds.add(a.id);}
 }
 return data.studies;
}
function artifact(type,title,status,values={}){return {id:uid(),type,title,status,values};}
export function seed(){const now=new Date().toISOString();return [
 {id:uid(),title:'A calmer way to manage money',description:'Helping young professionals feel more confident about their everyday finances.',category:'Fintech',status:'In progress',phase:3,cover:'sage',updated:now,artifacts:[artifact('persona','Meet Alex, the mindful spender','Done',{'Name & background':'Alex Morgan, 28. Product marketer living in a new city.','Goals & motivations':'Build an emergency fund and understand where money goes.','Pain points':'Banking apps feel overwhelming. Categories rarely match real life.','Needs & opportunities':'A simple weekly overview and gentle, actionable guidance.'}),artifact('empathy','Understanding financial anxiety','Done',{'Says':'“I just want to know if I’m doing okay.”','Thinks':'Am I saving enough for the future?','Does':'Checks account balances, avoids detailed statements.','Feels':'Overwhelmed by numbers, hopeful about small improvements.'}),artifact('journey','From payday to peace of mind','Done',{'Persona & scenario':'Alex receives their monthly salary.','Journey stages':'Payday → Review → Plan → Spend → Reflect','Pain points':'Manual transfers and unclear spending categories.'}),artifact('problem','Make everyday finances feel manageable','Done'),artifact('flow','First budget creation','In progress'),artifact('prototype','Budget overview · v1','In progress')]},
 {id:uid(),title:'Good food, less friction',description:'A more thoughtful grocery shopping experience for busy households.',category:'E-commerce',status:'In progress',phase:1,cover:'peach',updated:now,artifacts:[artifact('interview','Grocery habits & routines','Done'),artifact('persona','The weekly planner','Done'),artifact('journey','The weekly grocery run','In progress'),artifact('problem','Remove the planning burden','Not started')]},
 {id:uid(),title:'Making space for wellbeing',description:'Helping remote teams build healthier habits, one small moment at a time.',category:'Health & wellness',status:'In progress',phase:0,cover:'lavender',updated:now,artifacts:[artifact('interview','Working from home, feeling at home','Done'),artifact('empathy','The always-on employee','In progress'),artifact('survey','Understanding daily wellbeing','Not started')]},
 {id:uid(),title:'Learning without limits',description:'Making online learning more accessible, engaging, and personal.',category:'Education',status:'Completed',phase:5,cover:'blue',updated:now,artifacts:[artifact('persona','The lifelong learner','Done'),artifact('ia','A clearer course library','Done'),artifact('usability','Finding the right next lesson','Done'),artifact('handoff','Learning dashboard handoff','Done')]},
 {id:uid(),title:'Your city, a little closer',description:'Connecting curious people with the places and communities around them.',category:'Travel & community',status:'In progress',phase:2,cover:'sand',updated:now,artifacts:[artifact('persona','The weekend explorer','Done'),artifact('hmw','Make discovery feel personal','Done'),artifact('flow','Discover and save a local spot','In progress')]},
 {id:uid(),title:'Better care starts here',description:'Simplifying the appointment booking experience for patients and providers.',category:'Healthcare',status:'On hold',phase:4,cover:'rose',updated:now,artifacts:[artifact('journey','Booking the right care','Done'),artifact('prototype','Appointment booking prototype','Done'),artifact('usability','Booking flow usability sessions','In progress')]}
];}

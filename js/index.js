import * as d3 from 'd3';  // npm install d3 or yarn add d3
import f3 from 'family-chart';  // npm install family-chart@0.2.1 or yarn add family-chart@0.2.1
import 'family-chart/styles/family-chart.css';

fetch('https://github.com/FauzanXDeveloper/family-tree/blob/main/data-staljin.json')
  .then(res => res.json())
  .then(data => create(data))
  .catch(err => console.error(err))

function create(data) {
  const cont = document.querySelector("div#FamilyChart")  // make sure to create div with id FamilyChart
  const store = f3.createStore({
    data,
    node_separation: 250,
    level_separation: 150
  })
  const svg = f3.createSvg(cont)
  const Card = f3.elements.Card({
    store,
    svg,
    card_dim: {w:220,h:70,text_x:75,text_y:15,img_w:60,img_h:60,img_x:5,img_y:5},
    card_display: [d => d.data.label || '', d => d.data.desc || ''],
    mini_tree: true,
    link_break: false
  })

  store.setOnUpdate(props => f3.view(store.getTree(), svg, Card, props || {}))
  store.updateTree({initial: true})

  setTimeout(() => {
    const tree = store.getTree();
    const datum = tree.data[Math.floor(tree.data.length*Math.random())]  // random card
    console.log(datum.data.data)
    f3.handlers.cardToMiddle({datum, svg, svg_dim: svg.getBoundingClientRect(),  transition_time: 2000})
  }, 4000)
}

let currentFamilyMember = null;

function openForm(data) {
  currentFamilyMember = data; // Store the current family member's data
  document.getElementById("given-name").value = data['given name'] || '';
  document.getElementById("family-name").value = data['family name'] || '';
  document.getElementById("desc").value = data['desc'] || '';
  document.getElementById("place-of-birth").value = data['place of birth'] || '';
  document.getElementById("place-of-death").value = data['place of death'] || '';
  document.getElementById("gender").value = data['gender'] || '';

  // Show the form for editing
  document.getElementById("family-form").style.display = 'block';
  document.getElementById("edit-button").style.display = 'inline-block';
  document.getElementById("add-button").style.display = 'none';
}

function editForm() {
  // Enable the form for editing
  document.getElementById("family-form").onsubmit = function(e) {
    e.preventDefault();
    updateFamilyMember();
  };
}

function addForm() {
  // Clear form fields for adding a new member
  document.getElementById("family-form").reset();
  document.getElementById("family-form").onsubmit = function(e) {
    e.preventDefault();
    addNewFamilyMember();
  };
}

function updateFamilyMember() {
  // Update the family member's details
  currentFamilyMember['given name'] = document.getElementById("given-name").value;
  currentFamilyMember['family name'] = document.getElementById("family-name").value;
  currentFamilyMember['desc'] = document.getElementById("desc").value;
  currentFamilyMember['place of birth'] = document.getElementById("place-of-birth").value;
  currentFamilyMember['place of death'] = document.getElementById("place-of-death").value;
  currentFamilyMember['gender'] = document.getElementById("gender").value;

  // Update the family tree
  store.updateTree();
}

function addNewFamilyMember() {
  // Add the new family member (to be implemented)
  const newFamilyMember = {
    'given name': document.getElementById("given-name").value,
    'family name': document.getElementById("family-name").value,
    'desc': document.getElementById("desc").value,
    'place of birth': document.getElementById("place-of-birth").value,
    'place of death': document.getElementById("place-of-death").value,
    'gender': document.getElementById("gender").value
  };

  // Add the new family member to the store or the tree data structure
  store.addNode(newFamilyMember);
  store.updateTree();
}

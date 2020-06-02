<template>
  <div class="container" style="max-width:100%;padding:0px;height:100%;">
 <!--  <leftNav></leftNav>   Left side Navigation -->
    <div class="row"
    style="margin-left: 120px;border-left: 18px solid #f8f9fa;">
      <div class="col-sm-10" style="padding-left: 30px;max-width: 1270px;border-right: 18px solid rgb(248, 249, 250);">
        <br>
        <h4>Scenario Generator</h4>
        <hr>
        <alert :message=message v-if="showMessage"></alert>
        <br><br>
        <!-- Add Rules Form -->
      <div class="addrules">
      <b-form @submit="submitSteps" class="w-50">

      <div style="display: -webkit-inline-box;margin-right: 20px;
        box-shadow: rgba(108, 117, 125, 0) 0px 0px 0px 5px inset;width:1200px;
        padding: 30px 10px 30px 30px;min-height: 30px;margin-bottom: 30px;background-color:#94989624;">
        <b-form-group id="form-application-group"
                    label="Application:"
                    label-for="form-application-input"
                    style="margin-right: 20px;">
          <b-form-select v-on:change="selectAppOS()" v-model="application"
            id="form-application-group1" required>
            <option value="" selected>Please Select Application</option>
          <!--  <option value="parkjockey_web">ParkJockey Web</option>  -->
            <option value="parkjockey_hangtag">ParkJockey Hangtag</option>
            <option value="tile">Tile</option>
            <option value="parkjockey_web">ParkJockey Web</option>
        </b-form-select>
        </b-form-group>
        <b-form-group id="form-os-group"
                    label="OS:"
                    label-for="form-os-input"
                    style="margin-right: 20px;">
          <b-form-select v-on:change="selectAppOS()" v-model="os"
            id="form-os-group1" required>
            <option value="" selected>Please Select OS</option>
            <option value="android">Android</option>
            <option value="ios">IOS</option>
           <option value="website">Website</option>
        </b-form-select>
        </b-form-group> 
      </div>

        <div style="display: -webkit-inline-box;margin-right: 20px;
        box-shadow: rgba(108, 117, 125, 0) 0px 0px 0px 5px inset;width:1200px;
        padding: 30px 10px 30px 30px;min-height: 30px;margin-bottom: 30px;background-color:#94989624;">
        <b-form-group id="form-flowname-group"
                    label="Flow Name:"
                    label-for="form-flowname-input"
                    style="margin-right: 20px;">
          <b-form-input id="form-flowname-input"
                        type="text"
                        v-model.trim="flowname"
                        placeholder="Enter Flow name"
                        required>
          </b-form-input>
        </b-form-group>
        <b-button-group style="display:-webkit-inline-box;width:700px;">
          <b-button type="submit" variant="primary" @click="addscenario(maincount)"
          style="width: 150px;margin-right: 30px;margin-top:30px;">Add Scenario</b-button>
        </b-button-group>  
        </div>
        <div v-if="maincount > 0">
        <div  style="margin-right: 20px;
        box-shadow: rgba(108, 117, 125, 0) 0px 0px 0px 5px inset;width:1200px;
        padding: 30px 10px 30px 30px;min-height: 30px;margin-bottom: 30px;background-color:#94989624;">
        <div v-for="(scenario, index1) in addScenarioForm" :key="index1" style="display: -webkit-box;">
        <b-form-group id="form-scenarioname-group"
                    label="Scenario Name:"
                    label-for="form-scenarioname-input"
                    style="margin-right: 20px;">
          <b-form-input id="form-scenarioname-input"
                        type="text"
                        v-model="scenario.scenarioname" :name="`addScenarioForm[${index1}][scenarioname]`"
                        placeholder="Enter Scenario Name"
                        required>
          </b-form-input>
        </b-form-group>
        <b-form-group label="Enabled:"
                      label-for="form-enabled-input"
                      style="margin-right: 20px;">
            <b-form-select v-model="scenario.enabled"
            id="form-enabled-group"
            :name="`addScenarioForm[${index1}][enabled]`" required>
            <option value="" selected>Please select....</option>
            <option value="TRUE">True</option>
            <option value="FALSE">False</option>
        </b-form-select>
        </b-form-group>
        <b-form-group id="form-description-group"
                    label="Description:"
                    label-for="form-description-input"
                    style="margin-right: 20px;">
          <b-form-input id="form-description-input"
                        type="text"
                        v-model="scenario.description" :name="`addScenarioForm[${index1}][description]`"
                        placeholder="Enter Description"
                        required>
          </b-form-input>
        </b-form-group>
        <b-form-group id="form-testcaseid-group"
                    label="Testcase ID:"
                    label-for="form-testcaseid-input"
                    style="margin-right: 20px;">
          <b-form-input id="form-testcaseid-input"
                        type="text"
                        v-model="scenario.testcaseid" :name="`addScenarioForm[${index1}][testcaseid]`"
                        placeholder="Enter testcase id"
                        required>
          </b-form-input>
        </b-form-group>
        <div v-if="submitCount > index1" style="margin-top: 30px;color: green;">
          <span>Scenario added</span>
          <button @click="viewScenario(index1+1, scenario.scenarioname)" variant="none"
          style="width: 30px;padding-left:35px;margin-right: 10px;background:none;border:none;"><img src="Look.png" alt="view" style="width:20px;"></button>
        </div>
        </div>
        </div>
        <!-- Conditions Form -->
        <div
        style="margin-right: 20px;box-shadow: rgba(108, 117, 125, 0) 0px 0px 0px 5px inset;
        width: 1200px;background-color:#94989624;
        padding: 30px 10px 30px 30px;min-height: 30px;margin-bottom: 30px;">
        <div v-for="(rules, index) in addStepForm" :key="index">
        <div style="display: -webkit-box;" >
        <div></div><h6 style="padding-top: 35px;margin-right:15px;">Step : {{ index+1 }}</h6>
        <b-form-group id="form-screenname-group"
                      label="Screen Name:"
                      label-for="form-screenname-input"
                      style="margin-right: 20px;">
            <b-form-select v-on:change="getNames(rules.screenname, index)" v-model="rules.screenname" 
            :name="`addStepForm[${index}][screenname]`" id="form-screenname-input" required>
            <option value="" selected>Please select screen name</option>
            <option v-for="(scname, index2) in scnames" :key="index2" :value=scname>
            {{scname}}</option>
            </b-form-select>
        </b-form-group>    
        <b-form-group id="form-name-group"
                      label="Name:"
                      label-for="form-name-input"
                      style="margin-right: 20px;">
          <!--  <b-form-input id="form-name-input"
                          type="text"
                          v-model="rules.name" :name="`addStepForm[${index}][name]`"
                          placeholder="Enter name">
            </b-form-input>  -->
                <b-form-select v-model="rules.name" :name="`addStepForm[${index}][name]`"
                id="form-name-input" required>
                  <option value="" selected>Please select name</option>
                  <option v-for="(name1, index3) in names1[index]" :key="index3" :value=name1>
                  {{name1}}</option>
               </b-form-select>
          </b-form-group>
        <b-form-group id="form-action-group"
                      label="Action:"
                      label-for="form-action-input"
                      style="margin-right: 20px;">
            <b-form-select v-model="rules.action" :name="`addStepForm[${index}][action]`"
            id="form-action-input" required>
            <option value="" selected>Please select action </option>
            <option v-for="(act, index5) in actionlist" :key="index5" :value=act>
                    {{act}}</option>
          <!--  <option value="button">Button</option>
            <option value="text_input">Text Input</option>
             <option value="securetext_input">Secure Text Input</option>
             <option value="fetch_text">fetch_text</option>
             <option value="username_text_input">username_text_input</option>
             <option value="email_text_input">email_text_input</option>
             <option value="toggle">toggle</option>
             <option value="new_user">new_user</option>
             <option value="phone">phone</option>
             <option value="verify_code">verify_code</option>
             <option value="drop_down">drop_down</option>
             <option value="drop_down_max">drop_down_max</option>
             <option value="horizontal_swipe">horizontal_swipe</option>
             <option value="vertical_swipe">vertical_swipe</option>
             <option value="camera">camera</option>
             <option value="expect">Expect</option>  -->
            </b-form-select>
          </b-form-group>
        <b-form-group id="form-value-group"
                      label="Value:"
                      label-for="form-value-input"
                      style="margin-right: 20px;">
          <!--  <b-form-input id="form-value-input"
                          type="text"
                          v-model="rules.value" :name="`addStepForm[${index}][value]`"
                          placeholder="Enter value" required> 
            </b-form-input>  -->
              <b-form-select v-model="rules.value" :name="`addStepForm[${index}][value]`"
                  id="form-value-input" required>
                  <option value="" selected>Please select value </option>
                  <option v-for="(val, index4) in values" :key="index4" :value=val>
                    {{val}}</option>
                <!--  <option value="xpath">xpath</option>
                  <option value="id">id</option>
                  <option value="name">name</option>
                  <option value="username">username</option>
                  <option value="password">password</option>
                  <option value="incorrect_password">incorrect_password</option>
                  <option value="new_user_password">new_user_password</option>
                  <option value="wrong_username">wrong_username</option>
                  <option value="wrong_password">wrong_password</option>
                  <option value="Lot_name">Lot_name</option>
                  <option value="change_email">change_email</option>
                  <option value="previous_email">previous_email</option>  -->
            </b-form-select>
          </b-form-group>
        
               
        <div v-if="index == 0"> 
        <button @click="addmorerules(count)" variant="none"
          style="width: 30px;padding-top:35px;margin-right: 10px;background:none;border:none;"><img src="plus.jpg" alt="+" style="width:20px;"></button>
        </div>
        <div v-if="count > 0 && index > 0">  
        <button @click="removerules(count,index)" variant="none"
          style="width: 30px;padding-top:35px;margin-right: 30px;background:none;border:none;"><img src="minus.png" alt="+" style="width:24px;"></button>
        </div>  
        </div>
        <div v-if="rules.action == 'expect'" style="display: -webkit-inline-box;margin-left: 70px;"> 
        <b-form-group id="form-condition-group"
                      label="Condition:"
                      label-for="form-condition-input"
                      style="margin-right: 20px;">
            <b-form-select v-model="rules.condition" :name="`addStepForm[${index}][condition]`"
            id="form-condition-input" required>
            <option value="" selected>Please select condition </option>
            <option value="isDisplayed">Is Displayed</option>
            </b-form-select>
          </b-form-group>
        <b-form-group id="form-value-group"
                      label="Value 1:"
                      label-for="form-value1-input"
                      style="margin-right: 20px;">
            <b-form-input id="form-value1-input"
                          type="text"
                          v-model="rules.value1" :name="`addStepForm[${index}][value1]`"
                          placeholder="Enter value1" required>
            </b-form-input>
          </b-form-group>
        <b-form-group id="form-value2-group"
                      label="Value 2:"
                      label-for="form-value2-input"
                      style="margin-right: 20px;">
            <b-form-input id="form-value2-input"
                          type="text"
                          v-model="rules.value2" :name="`addStepForm[${index}][value2]`"
                          placeholder="Enter value2" required>
            </b-form-input>
          </b-form-group>
        <b-form-group id="form-expectstring-group"
                      label="Expect String:"
                      label-for="form-expectstring-input"
                      style="margin-right: 20px;">
            <b-form-input id="form-expectstring-input"
                          type="text"
                          v-model="rules.expectstring" :name="`addStepForm[${index}][expectstring]`"
                          placeholder="Enter expectstring" required>
            </b-form-input>
          </b-form-group>
        </div>

        <div v-if="rules.action != 'expect'" style="display: -webkit-inline-box;margin-left: 70px;"> 
        <b-form-group id="form-conditionexec-group"
                      label="Condition Exec:"
                      label-for="form-conditionexec-input"
                      style="margin-right: 20px;">
            <b-form-select v-model="rules.conditionexec" :name="`addStepForm[${index}][conditionexec]`"
            id="form-conditionexec-input" required>
            <option value="" selected>Please select cond_exec </option>
            <option value="enabled">Enabled</option>
            <option value="disabled">Disabled</option>
            </b-form-select>
          </b-form-group>
        <b-form-group id="form-skipflag-group"
                      label="Skip Flag:"
                      label-for="form-skipflag-input"
                      style="margin-right: 20px;">
            <b-form-select v-model="rules.skipflag" :name="`addStepForm[${index}][skipflag]`"
            id="form-skipflag-group" required>
            <option value="" selected="selected">Please select skipflag </option>
            <option value="enabled">Enabled</option>
            <option value="disabled">Disabled</option>
            </b-form-select>
          </b-form-group>  
        </div> 
        </div>
        <b-button-group style="display:-webkit-inline-box;width:700px;">
          <b-button variant="primary" type="submit"
          style="width: 150px;margin-right: 30px;margin-top:30px;">Submit Steps</b-button>
        </b-button-group> 
        </div>
        <b-button-group style="display:-webkit-inline-box;width:700px;">
          <click-confirm placement="bottom">
          <b-button  variant="primary" @click="createFile()"
          style="width: 150px;margin-right: 30px;margin-top:30px;">Create File</b-button>
          </click-confirm>
          <b-button  variant="primary" @click="reloadPage()"
          style="width: 150px;margin-right: 30px;margin-top:30px;">Reset</b-button>
        </b-button-group>
      </div>
      </b-form>
      </div>
      <div style = "display:none;margin-top: 15px;" id="downloadLink"></div>
    <br><br>
    <hr><br><br>
    </div>
    <div style="width: 225px;margin-left: 20px;margin-top: 100px;">
      <div>
        <!-- Single button triggers two "<b-collapse>" components -->
        <b-button class="btn btn-link" v-b-toggle.collapse-a.collapse-b variant="light" style="cursor:help">Help ?</b-button>

        <!-- Elements to collapse -->
        <b-collapse id="collapse-a" class="mt-2" style="background: aliceblue;padding-top:10px;padding-bottom: 10px;padding-right: 10px;">
          <span style="padding-left:10px;">Instructions</span>
          <span v-b-toggle.collapse-a.collapse-b style="padding-left:10px;float: right;padding-right: 10px;cursor:pointer">Close[X]</span>
          <ul style="list-style-position: outside;padding-top: 10px;">
          <li>Enter Flowname</li>
          <li >Add Scenario Button : to enter a new scenario</li>
          <li>Enter scenario details</li>
          <li>Enter steps</li>
          <li>Use + button to add more steps</li>
          <li>Use - button to remove a step</li>
          <li>Submit Steps Button : to save steps for that particular scenario</li>
          <li>To Add new scenario, click Add Scenario Button</li>
          <li>Follow above instructions to add steps and submit</li>
          <li>Create File Button : To create file based on the scenarios added</li>
          <li>Reset Button : To reset the page</li>
          <li>Download File Link : To download the file created file</li>
          </ul>
          <span style="padding-left:10px;">Notes</span>
          <ul style="list-style-position: outside;padding-top: 10px;">
          <li>Form validations are not included in this version </li>
          <li>Add Flowname without blank spaces</li>
          <li >A new scenario can be added only after submitting the previous scenario</li>
          <li>Edit, Delete functionalities for an added scenario is not included</li>
          <li>Ensure all scenarios are added before clicking the Create File Button</li>
          </ul>
          <div></div>
        </b-collapse>
      </div>
      <b-modal ref="viewModal"
            id="view-modal"
            title=""
            hide-footer>
          <div id="response" class="viewmodal">
            <div >
              <h5>Scenario</h5>
              <span style="margin-right:20px;">{ name: {{ viewSceArray.name }},</span>
              <span style="margin-right:20px;">Enabled: {{ viewSceArray.enabled }},</span>
              <span style="margin-right:20px;">Description: {{ viewSceArray.desc }},</span>
              <span>Testcase ID: {{ viewSceArray.testcase_id }}  }</span>
            </div>
            <br><br>
            <h5>Steps</h5>
            <div v-for="(steps, id) in viewStepArray" :key="id">
              <div v-if="id != 'stepcount'">
              <p style="float:left;">Step: {{ id }}</p><br>
              <span style="float:left;margin-right:10px;">{  </span>
              <div v-for="(steps1, id1) in viewStepArray[id]" :key="id1">
              <span style="margin-right:20px;float:left;">  {{ id1 }} : {{ steps1 }},</span>
              </div>
              <span style="float:left;">}</span>
              <br><br><br>
              </div>
              <div v-if="id == 'stepcount'">Step Count : {{ viewStepArray.stepcount }}</div>
            </div>
          </div>
    </b-modal>
    </div>
    </div>
    <div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Alert from './Alert.vue';
import leftNav from './leftNav.vue';
import ClickConfirm from 'click-confirm';

export default {
  data: () => ({
    addScenarioForm : [
      {
      scenarioname: '',
      enabled: '',
      description: '',
      testcaseid: '',
      },
    ],
    addStepForm: [
      {
        screenname: '',
        name: '',
        action: '',
        value: '',
        condition: '',
        value1: '',
        value2: '',
        expectstring: '',
        conditionexec: '',
        skipflag: '',
      },  
    ],
    application: '',
    os: '',
    flowname: '',
    message: '',
    showMessage: false,
    count: 0,
    maincount: 0,
    submitCount: 0,
    scenarioCount: 0,
    stepSaveArray : {},
    finalarraydata: {},
    flowarray: {},
    flowarray1: {},
    arrayA: {},
    arrayB: {},
    arrayC: {},
    arrayD: {},
    arrayE: {},
    scnamesArray: {},
    scnames: [],
    names1: [],
    values: [],
    actionlist: [],
    viewSceArray: '',
    viewStepArray: '',
    app: '',
    osname: '',
  }),
  components: {
    alert: Alert,
    leftNav: leftNav,
    clickConfirm: ClickConfirm,
  },
  methods: {
    selectAppOS (){
      this.app = this.application;
      this.osname = this.os;
      console.log(this.app, this.osname);
      if (this.app != '' && this.osname != '') {
        this.scnamesArray = {};
        this.scnames = [];
        this.names1 = [];
        this.values = [];
        this.actionlist = [];
        this.getScreenNames(this.app, this.osname);
      }
    },
    viewScenario(num, val) {
      let viewSceArray = '';
      let viewStepArray = '';
      Object.keys(this.arrayA).forEach((key) => {
        if (key == val) {
          this.viewStepArray = this.arrayA[key];
        }
      });
      Object.keys(this.arrayB).forEach((key1) => {
        if (key1 == num) {
          this.viewSceArray = this.arrayB[key1];
        }
      });
      this.$refs.viewModal.show();
    },
    // Fetch screen names
    getScreenNames (appname, osdetail) {
      let scnames = [];
      let scnamesArray = {};
      let jsonScreennameFile = appname + ".json";
      axios.get(jsonScreennameFile)
        .then((response) => {
          this.scnamesArray = response.data[appname][osdetail].screenname;
          this.scnames = Object.keys(response.data[appname][osdetail].screenname);
          this.values = Object.values(response.data[appname].value);
          this.actionlist = Object.values(response.data[appname].Action);
          console.log(this.scnames);
          console.log(this.values);
          console.log(this.actionlist);
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.error(error);
      });  
    },
    // Fetch names based on screen names
    getNames(namescreen, id) {
      console.log('aaa');
      let names1 = [];
      Object.keys(this.scnamesArray).forEach((key) => {
        console.log(key, namescreen);
        if (key == namescreen) {
          this.$set(this.names1, id, this.scnamesArray[key]);
          console.log(this.names1);
        }
      });
    },
    // Add more conditions
    addscenario(mcount) {
      event.preventDefault();
      console.log(mcount);
      if (mcount == 0) {
        this.maincount = mcount + 1;
      }
      if (mcount >= 1 && this.submitCount == this.maincount) {
        this.maincount = mcount + 1;
        console.log(this.maincount);
        this.addScenarioForm.push({
          scenarioname: '',
          enabled: '',
          description: '',
          testcaseid: '',
        });
      }
      
    },
    addmorerules(val) {
      event.preventDefault();
      const newval = parseInt(val, 10);
      const val1 = val + 1;
      this.addStepForm.push({
        screenname: '',
        name: '',
        action: '',
        value: '',
        condition: '',
        value1: '',
        value2: '',
        expectstring: '',
        conditionexec: '',
        skipflag: '',
      });
      this.count = val1;
    },
    // remove conditions
    removerules(val,remid) {
      event.preventDefault();
      const sub = '#remcond';
      const ifrules = '#ifrules';
      if (val === 1) {
       // document.querySelector(ifrules).style.display = 'none';
       // document.querySelector(sub).style.display = 'none';
      }
      this.addStepForm.splice(remid, 1);
      const val1 = val - 1;
      this.count = val1;
    },
    
    // Initializing rules form
    initForm() {
      this.addStepForm[0].screenname = '';
      this.addStepForm[0].name = '';
      this.addStepForm[0].action = '';
      this.addStepForm[0].value = '';
      this.addStepForm[0].condition = '';
      this.addStepForm[0].value1 = '';
      this.addStepForm[0].value2 = '';
      this.addStepForm[0].expectstring = '';
      this.addStepForm[0].conditionexec = '';
      this.addStepForm[0].skipflag = '';
    },
    submitSteps(evt) {
      evt.preventDefault();
      const steparray = this.addStepForm;
      const scenarioArray = this.addScenarioForm;
      const scenarioIndex = this.scenarioCount;
      const stepCount = steparray.length;
      console.log(steparray.length);
      let formdata = {};
      let arraydata = {};
      let newarraydata = {};
      
      for (let i = 0; i < steparray.length; i += 1) {
        let screenname1 = this.addStepForm[i].screenname;
        let name1 = this.addStepForm[i].name;
        let action1 = this.addStepForm[i].action;
        let value1 = this.addStepForm[i].value;

        formdata = {};
        let steps = i+1;
        formdata[steps] = {};
        formdata[steps]['screen_name'] = screenname1;
        formdata[steps]['name'] = name1;
        formdata[steps]['action'] = action1;
        formdata[steps]['value'] = value1;
        if (action1 == 'expect') {
          formdata[steps]['condition'] = this.addStepForm[i].condition;
          formdata[steps]['value1'] = this.addStepForm[i].value1;
          formdata[steps]['value2'] = this.addStepForm[i].value2;
          formdata[steps]['expect_string'] = this.addStepForm[i].expectstring;
        }
        if (action1 != 'expect' && this.addStepForm[i].conditionexec == 'enabled') {
          formdata[steps]['cond_exec'] = this.addStepForm[i].conditionexec;
        }
        if (action1 != 'expect' && this.addStepForm[i].skipflag == 'enabled') {
          formdata[steps]['skipflag'] = this.addStepForm[i].skipflag;
        }
        arraydata = Object.assign(arraydata, formdata);
        console.log(arraydata);
      }
      //console.log(this.addScenarioForm[scenarioIndex].scenarioname);
      arraydata['stepcount'] = stepCount;
      let scenarioname1 = this.addScenarioForm[scenarioIndex].scenarioname;
      newarraydata[scenarioname1] = arraydata;
      this.arrayA = Object.assign(this.arrayA, newarraydata);

      let flowname1 = this.flowname;
      let flowarrayIndex = this.maincount;
      let flowarrayIndex1 = flowarrayIndex - 1;
      let flowarray = {};
     // flowarray[flowname1] = {};
      flowarray[flowarrayIndex] = {};
      flowarray[flowarrayIndex]['name'] = this.addScenarioForm[flowarrayIndex1].scenarioname;
      flowarray[flowarrayIndex]['enabled'] = this.addScenarioForm[flowarrayIndex1].enabled;
      flowarray[flowarrayIndex]['desc'] = this.addScenarioForm[flowarrayIndex1].description;
      flowarray[flowarrayIndex]['testcase_id'] = this.addScenarioForm[flowarrayIndex1].testcaseid;

      this.arrayB = Object.assign(this.arrayB, flowarray);
      this.submitCount = this.submitCount + 1;
      this.scenarioCount = this.scenarioCount + 1;

      document.querySelector('#form-application-group1').disabled = true;
      document.querySelector('#form-os-group1').disabled = true;
      this.addStepForm.splice(1, stepCount);
      /*
      let j=0;
      while (j < stepCount) {
        this.addStepForm.splice(j, 1);
        console.log(stepCount);
        j=j+1;
      }
     for (let j = 1; j <= stepCount; j += 1) {
        this.addStepForm.splice(j, 1);
        console.log(stepCount);
      } */
      this.initForm();
      console.log(arraydata);
      console.log(newarraydata);
      console.log(flowarray);
      console.log(this.arrayA);
      console.log(this.arrayB);
    },
    trimSpace(a) {
      return a.split(' ').join('');
    },
    createFile() {
      let completeArray = {};
      let jsonFileName = this.trimSpace(this.flowname);
      this.arrayB['scenario_count'] = this.scenarioCount;
      this.arrayC[this.flowname] = this.arrayB;
      this.arrayD['steps'] = this.arrayA;
      this.arrayE['scenarios'] = this.arrayC;
      completeArray = Object.assign(this.arrayE, this.arrayD);
      completeArray['filename'] = jsonFileName;
     // console.log(completeArray);
      if (Object.keys(this.arrayC).length != 0 && Object.keys(this.arrayA).length !=0) {
        const path = 'http://localhost:5001/createJson';
        axios.post(path, completeArray)
          .then((resp) => {
            this.message = 'Scenario Added Successfully';
            this.showMessage = true;
            document.querySelector('#downloadLink').style.display = 'block';
            document.querySelector('#downloadLink').innerHTML = resp.data;
            window.scrollTo(0, 0);
          })
          .catch((error) => {
            console.log(error);
          });
      }
      else {
          this.message = 'Error !!!';
          this.showMessage = true;
      }     
    },
    reloadPage(){
      window.location.reload();
    },
  },
  // city and operands are listed onload
  created() {
   // this.getScreenNames();
  },
};
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style scoped>
#tj-datetime-input {
    height: 38px;
    min-width: 176px;
}
</style>

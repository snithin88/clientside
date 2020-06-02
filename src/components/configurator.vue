<template>
  <div class="container" style="max-width:100%;padding:0px;height:100%;">
 <!--  <leftNav></leftNav>   Left side Navigation -->
    <div class="row"
    style="margin-left: 120px;border-left: 18px solid #f8f9fa;">
      <div class="col-sm-10" style="padding-left: 30px;max-width: 1270px;border-right: 18px solid rgb(248, 249, 250);">
        <br>
        <h4>Scenario Configurator</h4>
        <hr>
        <alert :message=message v-if="showMessage"></alert>
        <br><br>
        <!-- Add Rules Form -->
      <div class="addrules">

      <div style="display: -webkit-inline-box;margin-right: 20px;
        box-shadow: rgba(108, 117, 125, 0) 0px 0px 0px 5px inset;width:1200px;
        padding: 30px 10px 30px 30px;min-height: 30px;margin-bottom: 30px;background-color:#94989624;">
        <b-form-group id="form-application-group"
                    label="Application:"
                    label-for="form-application-input"
                    style="margin-right: 20px;">
        <b-form-select v-on:change="selectOS(application)" v-model="application"
            id="form-application-group1" required>
            <option value="" :selected="true">Please select Application</option>
            <option v-for="(app, index) in applications" :key="index" :value=app>
            {{app}}</option>
            </b-form-select>
        </b-form-group>
        <b-form-group id="form-os-group"
                    label="OS:"
                    label-for="form-os-input"
                    style="margin-right: 20px;">
        <b-form-select v-on:change="selectAppOS()" v-model="os"
            id="form-application-os" required>
            <option value="" :selected="true">Please select OS</option>
            <option v-for="(os, ind) in oslist" :key="ind" :value=os>
            {{os}}</option>
        </b-form-select>
        </b-form-group>
        <div v-if="reset == true">
            <b-button-group style="display:-webkit-inline-box;width:700px;">
          <b-button type="submit" variant="primary" @click="resetAppOs()"
          style="width: 150px;margin-right: 30px;margin-top:30px;">Reset</b-button>
        </b-button-group>
        </div>
      </div>

        <div  v-if ="buttonVisible == true" style="display: -webkit-inline-box;margin-right: 20px;
        box-shadow: rgba(108, 117, 125, 0) 0px 0px 0px 5px inset;width:1200px;
        padding: 30px 10px 30px 30px;min-height: 30px;margin-bottom: 30px;background-color:#94989624;">
      <!--  <b-form-group id="form-flowname-group"
                    label="Flow Name:"
                    label-for="form-flowname-input"
                    style="margin-right: 20px;">
          <b-form-input id="form-flowname-input"
                        type="text"
                        v-model.trim="flowname"
                        placeholder="Enter Flow name"
                        required>
          </b-form-input>
        </b-form-group> -->
        <b-button-group style="">
          <b-button type="submit" variant="primary" @click="viewScreenNames()"
          style="width: 150px;margin-right: 30px;margin-top:30px;">Screen Name</b-button>
        </b-button-group>
        <b-button-group style="">
          <b-button type="submit" variant="primary" @click="viewAction()"
          style="width: 150px;margin-right: 30px;margin-top:30px;">Action</b-button>
        </b-button-group> 
        <b-button-group style="">
          <b-button type="submit" variant="primary" @click="viewValue()"
          style="width: 150px;margin-right: 30px;margin-top:30px;">Value</b-button>
        </b-button-group> 
        </div>
        <div v-if="screenButton == true">
        <div  style="margin-right: 20px;
        box-shadow: rgba(108, 117, 125, 0) 0px 0px 0px 5px inset;width:1200px;
        padding: 30px 10px 30px 30px;min-height: 30px;margin-bottom: 30px;background-color:#94989624;">
        <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col">SL No:</th>
              <th scope="col">Screen Name</th>
              <th scope="col">Names</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(scenarioNames, index) in scnames" :key="index">
              <td>{{ index+1 }}</td>
              <td >{{ scenarioNames }}</td>
              <td><div  v-for="(names, index2) in scnamesArray[scenarioNames]" :key="index2">
                {{ names }}</div></td>
              <td>
              <div class="btn-group" role="group">
                  <button
                          type="button"
                          class="btn btn-warning btn-sm"
                          v-b-modal.edit-operand-modal
                          style="margin-right:10px;"
                          @click="editScreenName(application)">
                      Update
                  </button> <button
                          type="button"
                          class="btn btn-danger btn-sm">
                      Delete
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        </div>
        </div>

        <div v-if="actionButton == true">
        <div  style="margin-right: 20px;
        box-shadow: rgba(108, 117, 125, 0) 0px 0px 0px 5px inset;width:1200px;
        padding: 30px 10px 30px 30px;min-height: 30px;margin-bottom: 30px;background-color:#94989624;">
        <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col">SL No:</th>
              <th scope="col">Action</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr >
              <td>1</td>
              <td style="width:600px;"><div v-for="(actions, index) in actionlist" :key="index" style="display: contents">{{ actions }},&#xa0;</div></td>
              <td>
              <div class="btn-group" role="group">
                  <button
                          type="button"
                          class="btn btn-warning btn-sm"
                          v-b-modal.edit-action-modal
                          style="margin-right:10px;"
                          @click="editAction(application)">
                      Update
                  </button>
                </div>
                </td>
            </tr>
          </tbody>
        </table>
        </div>
        </div>

        <div v-if="valueButton == true">
        <div  style="margin-right: 20px;
        box-shadow: rgba(108, 117, 125, 0) 0px 0px 0px 5px inset;width:1200px;
        padding: 30px 10px 30px 30px;min-height: 30px;margin-bottom: 30px;background-color:#94989624;">
        <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col">SL No:</th>
              <th scope="col">Value</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr >
              <td>1</td>
              <td style="width:600px;"><div v-for="(value, index) in values" :key="index" style="display: contents">{{ value }},&#xa0;</div></td>
              <td>
              <div class="btn-group" role="group">
                  <button
                          type="button"
                          class="btn btn-warning btn-sm"
                          v-b-modal.edit-value-modal
                          style="margin-right:10px;"
                          @click="editValue(application)">
                      Update
                  </button>
                </div>
                </td>
            </tr>
          </tbody>
        </table>
        </div>
        </div>

    </div>
    
      
    </div>
    </div>
    <div>
      <b-modal ref="editScreenNameModal"
            id="edit-screenname-modal"
            title="Edit ScreenName"
            hide-footer>
      <!-- Edit Value Form   -->   
      <b-form @submit="onUpdateScreenName" class="w-50">
      <b-form-group id="form-screenname-group"
                    label="Screen Name:"
                    label-for="form-screenname-input">
          <b-form-input id="form-screenname-input"
                        type="text"
                        v-model="editScreenNameForm.editScreenName"
                        required
                        disabled
                        placeholder="Enter name">
          </b-form-input>
        </b-form-group>
      <b-form-textarea
            id="textarea3"
            v-model="editScreenNameForm.editName"
            rows="3"
            max-rows="6"
            style="margin-bottom : 40px;margin-top:20px;"></b-form-textarea>
        <b-button-group>
          <b-button type="submit" variant="primary">Submit</b-button>
        </b-button-group>
      </b-form> 
    </b-modal>

      <b-modal ref="editValueModal"
            id="edit-value-modal"
            title="Edit Value"
            hide-footer>
      <!-- Edit Value Form   -->   
      <b-form @submit="onUpdateValue" class="w-50">
      <b-form-textarea
            id="textarea"
            v-model="editValueForm.editValue"
            rows="3"
            max-rows="6"
            style="margin-bottom : 40px;margin-top:20px;"></b-form-textarea>
        <b-button-group>
          <b-button type="submit" variant="primary">Submit</b-button>
        </b-button-group>
      </b-form> 
      </b-modal>

      <b-modal ref="editActionModal"
            id="edit-action-modal"
            title="Edit Action"
            hide-footer>
      <!-- Edit Value Form   -->   
      <b-form @submit="onUpdateAction" class="w-50">
      <b-form-textarea
            id="textarea1"
            v-model="editActionForm.editAction"
            rows="3"
            max-rows="6"
            style="margin-bottom : 40px;margin-top:20px;"></b-form-textarea>
        <b-button-group>
          <b-button type="submit" variant="primary">Submit</b-button>
        </b-button-group>
      </b-form> 
    </b-modal>
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
    editValueForm: {
        editValue: '',
      },
    editActionForm: {
        editAction: '',
      },
    editScreenNameForm: {
      editName : '',
      editScreenName : '',
    },
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
    appResponse: {},
    applications: {},
    oslist: {},
    buttonVisible: false,
    screenButton: false,
    valueButton: false,
    actionButton: false,
    reset: false,
  }),
  components: {
    alert: Alert,
    leftNav: leftNav,
    clickConfirm: ClickConfirm,
  },
  methods: {
    editValue(app) {
      console.log(app);
      const path = `http://localhost:5001/editValue/${app}`;
      axios.get(path)
        .then((res) => {
          console.log(res.data);
         // this.getOperands();
          this.$refs.editValueModal.show();
          this.editValueForm.editValue = res.data.join();
         // this.editOperandForm.name = index;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    onUpdateValue(evt) {
      evt.preventDefault();
      this.$refs.editValueModal.hide();
     // this.$refs.addOperandModal.hide();
     let editValue1 = [];
     editValue1 = this.editValueForm.editValue.split(",");
     console.log(editValue1);
      const payload = {
        value: editValue1,
        application: this.application,
        os: this.os,
      };
      const path = 'http://localhost:5001/updateValue';
      console.log(payload);
      axios.post(path, payload)
        .then(() => {
          this.getScreenNames();
          this.message = 'Value Edited!';
          this.showMessage = true;
        })
        .catch((error) => {
          console.log(error);
        });
      this.initForm();
    },
    editAction(app) {
      console.log(app);
      const path = `http://localhost:5001/editAction/${app}`;
      axios.get(path)
        .then((res) => {
          console.log(res.data);
         // this.getOperands();
          this.$refs.editActionModal.show();
          this.editActionForm.editAction = res.data.join();
         // this.editOperandForm.name = index;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    onUpdateAction(evt) {
      evt.preventDefault();
      this.$refs.editActionModal.hide();
     // this.$refs.addOperandModal.hide();
     let editAction1 = [];
     editAction1 = this.editActionForm.editAction.split(",");
     console.log(editAction1);
      const payload = {
        action: editAction1,
        application: this.application,
        os: this.os,
      };
      const path = 'http://localhost:5001/updateAction';
      console.log(payload);
      axios.post(path, payload)
        .then(() => {
          this.getScreenNames();
          this.message = 'Action Edited!';
          this.showMessage = true;
        })
        .catch((error) => {
          console.log(error);
        });
      this.initForm();
    },

    editScreenName(app) {
      console.log(app);
      const path = `http://localhost:5001/editAction/${app}`;
      axios.get(path)
        .then((res) => {
          console.log(res.data);
         // this.getOperands();
          this.$refs.editScreenNameModal.show();
          this.editScreenNameForm.editName = res.data.join();
         // this.editOperandForm.name = index;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    onUpdateScreenName(evt) {
      evt.preventDefault();
      this.$refs.editScreenNameModal.hide();
     // this.$refs.addOperandModal.hide();
     let editAction1 = [];
     editAction1 = this.editActionForm.editAction.split(",");
     console.log(editAction1);
      const payload = {
        action: editAction1,
        application: this.application,
        os: this.os,
      };
      const path = 'http://localhost:5001/updateAction';
      console.log(payload);
      axios.post(path, payload)
        .then(() => {
          this.getScreenNames();
          this.message = 'Action Edited!';
          this.showMessage = true;
        })
        .catch((error) => {
          console.log(error);
        });
      this.initForm();
    },

    getApplication () {
      const path = 'http://localhost:5001/application';
      let applications = '';
      let appResponse = '';
      console.log('aaaa');
      axios.get(path)
        .then((res) => {
          this.appResponse = res.data;
          this.applications = Object.keys(res.data.application);
          console.log(this.applications)
        })
        .catch((error) => {
          console.error(error);
        });
    },
    selectOS (appName) {
        this.buttonVisible = false;
        Object.keys(this.appResponse.application).forEach((key) => {
            if (key == appName) {
                this.oslist = this.appResponse.application[key];
                this.os = '';
            }
        });
    },
    selectAppOS (){
      this.app = this.application;
      this.osname = this.os;
      console.log(this.app, this.osname);
      if (this.app != '' && this.osname != '') {
        this.buttonVisible = true;
        this.scnamesArray = {};
        this.scnames = [];
        this.names1 = [];
        this.values = [];
        this.actionlist = [];
        this.getScreenNames();
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
    getScreenNames () {
      let appname = this.application;
      let osdetail = this.os;
      let scnames = [];
      let scnamesArray = {};
      let jsonScreennameFile = appname + ".json";
      const path = `http://localhost:5001/screenNames/${appname}`;
      axios.get(path)
        .then((response) => {
          console.log(response.data);
          this.scnamesArray = response.data[appname][osdetail].screenname;
          this.scnames = Object.keys(response.data[appname][osdetail].screenname);
          this.values = Object.values(response.data[appname].value);
          this.actionlist = Object.values(response.data[appname].Action);
          console.log(this.scnamesArray);
          console.log(this.scnames);
          console.log(this.values);
          console.log(this.actionlist);
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.error(error);
      });  
    },
    viewScreenNames () {
        this.screenButton = true;
        this.valueButton = false;
        this.actionButton = false;
        this.reset = true;
        document.querySelector('#form-application-group1').disabled = true;
        document.querySelector('#form-application-os').disabled = true;
    },
    viewAction () {
        this.screenButton = false;
        this.valueButton = false;
        this.actionButton = true;
        this.reset = true;
        document.querySelector('#form-application-group1').disabled = true;
        document.querySelector('#form-application-os').disabled = true;
    },
    viewValue () {
        this.screenButton = false;
        this.valueButton = true;
        this.actionButton = false;
        this.reset = true;
        document.querySelector('#form-application-group1').disabled = true;
        document.querySelector('#form-application-os').disabled = true;
    },
    resetAppOs () {
        this.application = '';
        this.os = '',
        this.buttonVisible = false;
        this.screenButton = false;
        this.valueButton = false;
        this.actionButton = false;
        this.reset = false;
        document.querySelector('#form-application-group1').disabled = false;
        document.querySelector('#form-application-os').disabled = false;
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
    this.getApplication();
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

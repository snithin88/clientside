<template>
  <!-- Left Navigation -->
  <div >
      <b-navbar toggleable="lg" type="dark" variant="info" style="background-color: black !important;">
        <b-navbar-brand href="#">Test Engine</b-navbar-brand>
      </b-navbar>
  <!--  <div style="width: 270px;position: absolute;margin-top:10px;margin-left:10px;">
      <b-nav vertical  >
        <b-nav-item v-b-toggle.collapse-0 text="Item 3">Building Blocks</b-nav-item>
        <b-collapse id="collapse-0" class="mt-2" style="margin-left:15px;">
          <b-nav-item v-b-toggle.collapse-01 text="Item 3">&#x27A4; Operands</b-nav-item>
            <b-collapse id="collapse-01" class="mt-2" style="margin-left:15px;">
                <b-nav-item @click="$router.push('/addoperand')">&#x27A4; Add Operand</b-nav-item>
                <b-nav-item @click="$router.push('/addoperand')">&#x27A4; View Operand</b-nav-item>
            </b-collapse>    
          <b-nav-item v-b-toggle.collapse-02 text="Item 3">&#x27A4; Rules</b-nav-item>
            <b-collapse id="collapse-02" class="mt-2" style="margin-left:15px;">
                <b-nav-item @click="$router.push('rules')">&#x27A4; Add Rules</b-nav-item>
                <b-nav-item @click="$router.push('rulesdisplay')">&#x27A4; View Rules</b-nav-item>
                <b-nav-item @click="$router.push('activaterules')">&#x27A4; Set Rule Status</b-nav-item>
                <b-nav-item @click="$router.push('rulespriority')">&#x27A4; Set Rule Priority</b-nav-item>
            </b-collapse> 
           <b-nav-item v-b-toggle.collapse-03 text="Item 3">&#x27A4; Promocode</b-nav-item>
            <b-collapse id="collapse-03" class="mt-2" style="margin-left:15px;">
                <b-nav-item @click="$router.push('promocode')">&#x27A4; Add Promocode</b-nav-item>
                <b-nav-item @click="$router.push('promodisplay')">&#x27A4; View Promocode</b-nav-item>
            </b-collapse> 
        </b-collapse>
        <b-nav-item v-b-toggle.collapse-1 text="Item 3">Parking</b-nav-item>
        <b-collapse id="collapse-1" class="mt-2" style="margin-left:15px;">
          <b-nav-item v-b-toggle.collapse-10 text="Item 3">&#x27A4; Booking</b-nav-item>
            <b-collapse id="collapse-10" class="mt-2" style="margin-left:15px;">
                <b-nav-item @click="$router.push('/')" :active-class="active">&#x27A4; Add Booking</b-nav-item>
               <b-nav-item @click="$router.push('#')">&#x27A4; View Booking</b-nav-item> 
                <b-nav-item @click="$router.push('bookingrange')" :active-class="active">&#x27A4; Booking Range</b-nav-item>
            </b-collapse> 
        </b-collapse>
        <b-nav-item v-b-toggle.collapse-2 text="Item 3">Kitchen</b-nav-item>
        <b-collapse id="collapse-2" class="mt-2" style="margin-left:15px;">
          <b-nav-item v-b-toggle.collapse-20 text="Item 3">&#x27A4; Orders</b-nav-item>
            <b-collapse id="collapse-20" class="mt-2" style="margin-left:15px;">
                <b-nav-item  @click="$router.push('#')" >&#x27A4; Add Orders</b-nav-item>
                <b-nav-item @click="$router.push('#')">&#x27A4; View Orders</b-nav-item>
            </b-collapse> 
        </b-collapse>
      </b-nav>
    </div> -->
    </div>
</template>

<script >
  export default {
    data() {
        return { 
          selected: undefined,
          }
    },
  }
</script>
  
<style>

a.nav-link:active {
  color:green;
} 

/*
a .nav-link:active{
  color : red!important;
} */
/* .highlight > a {
  color: yellow!important;
} */
.nav-item  > a:hover {
    color : #ee4e04!important;
}
/* .nav-item  > a:active {
    color : green!important;
} */

/*
.navbar-default .navbar-nav > .active > a,
.navbar-default .navbar-nav > .active > a:hover,
.navbar-default .navbar-nav > .active > a:focus {
color: 'red'; /* <—– change your color here*//*
background-color: transparent;
} */
</style>
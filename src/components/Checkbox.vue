<template>
  <div class="checkbox-wrapper" @click="click">
    <input class="inp-cbx" type="checkbox" v-model="checked"/>
    <label class="cbx"><span>
    <svg width="12px" height="10px">
      <use xlink:href="#check-4"></use>
    </svg></span><span>{{ props.label }}</span></label>
    <svg class="inline-svg">
      <symbol id="check-4" viewbox="0 0 12 10">
        <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
      </symbol>
    </svg>
  </div>
  <!-- #Andreas Storm thank you :) -->
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  checked: false,
  label: ""
});

const checked = ref(props.checked)

const click = e => {
  checked.value = !checked.value
};
</script>

<style>
.checkbox-wrapper{
  display: inline-block;
}

.checkbox-wrapper * {
  box-sizing: border-box;
}
.checkbox-wrapper .cbx {
  -webkit-user-select: none;
  user-select: none;
  cursor: pointer;
  padding: 6px 8px;
  border-radius: 6px;
  overflow: hidden;
  transition: all 0.2s ease;
  display: inline-block;
}
.checkbox-wrapper .cbx:not(:last-child) {
  margin-right: 6px;
}
.checkbox-wrapper .cbx:hover {
  background: rgba(0,119,255,0.06);
}
.checkbox-wrapper .cbx span {
  float: left;
  vertical-align: middle;
  transform: translate3d(0, 0, 0);
}
.checkbox-wrapper .cbx span:first-child {
  position: relative;
  width: 18px;
  height: 18px;
  border-radius: 4px;
  transform: scale(1);
  border: 1px solid #cccfdb;
  transition: all 0.2s ease;
  box-shadow: 0 1px 1px rgba(0,16,75,0.05);
}
.checkbox-wrapper .cbx span:first-child svg {
  position: absolute;
  top: 3px;
  left: 2px;
  fill: none;
  stroke: #fff;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-dasharray: 16px;
  stroke-dashoffset: 16px;
  transition: all 0.3s ease;
  transition-delay: 0.1s;
  transform: translate3d(0, 0, 0);
}
.checkbox-wrapper .cbx span:last-child {
  padding-left: 8px;
  line-height: 18px;
}
.checkbox-wrapper .cbx:hover span:first-child {
  border-color: #07f;
}
.checkbox-wrapper .inp-cbx {
  position: absolute;
  visibility: hidden;
}
.checkbox-wrapper .inp-cbx:checked + .cbx span:first-child {
  background: #07f;
  border-color: #07f;
  animation: wave-4 0.4s ease;
}
.checkbox-wrapper .inp-cbx:checked + .cbx span:first-child svg {
  stroke-dashoffset: 0;
}
.checkbox-wrapper .inline-svg {
  position: absolute;
  width: 0;
  height: 0;
  pointer-events: none;
  user-select: none;
}
@media screen and (max-width: 640px) {
  .checkbox-wrapper .cbx {
    width: 100%;
    display: inline-block;
  }
}
@-moz-keyframes wave-4 {
  50% {
    transform: scale(0.9);
  }
}
@-webkit-keyframes wave-4 {
  50% {
    transform: scale(0.9);
  }
}
@-o-keyframes wave-4 {
  50% {
    transform: scale(0.9);
  }
}
@keyframes wave-4 {
  50% {
    transform: scale(0.9);
  }
}
</style>
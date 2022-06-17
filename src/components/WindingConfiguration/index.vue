<template>
  <el-dialog
  title="Tips"
  :visible="openDialog"
  width="60%">
  <span>This is a message</span>
  <span slot="footer" class="dialog-footer">
    <el-button @click="handleClose">Cancel</el-button>
    <el-button type="primary" @click="handleClose">Confirm</el-button>
  </span>
</el-dialog>
</template>

<script>
/* eslint-disable */
export default {
    props: [
        'openDialog'
    ],
    // data() {
    //      return {
    //         todo: this.openDialog
    //      }
    //   },
    methods: {
      handleClose() {
        this.$emit('close-dialog')
      }
    }
}
</script>

<style>

</style>
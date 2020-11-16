<template>
  <div class="contentBox baas-agent">
    <div style="background: #fff;width:100%">
      <div
        class="agent-document"
        v-html="agentDocument"
      ></div>
    </div>
  </div>
</template>
<script>
import agent from './agent.js'
export default {
  ...agent
}
</script>
<style lang="scss">
.agent-document {
  color: #141E52;
  padding: 0.8em 1em;
  h2 {
    margin-top: 1em;
    margin-bottom: 0.2em;
  }
  h2:first-child,
  h3:first-child,
  h4:first-child,
  h5:first-child,
  h6:first-child {
    margin-top: 0;
  }
  pre {
    padding: 14px 33px;
    overflow: auto;
    line-height: 1.45;
    background-color: #F2F5FA;
    border-radius: 6px;
  }
  code, kbd, samp {
    color: #2F3866;
    font-family: Consolas, monospace, monospace;
  }
  ul, ol {
    padding-left: 1.4em;
  }
  blockquote {
    margin: 0;
    color: #6E7285;
    p {
      margin-top: 0.6em;
    }
  }
}


</style>

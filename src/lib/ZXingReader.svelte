<script lang="ts">
  import {
    BarcodeFormat,
    DecodeHintType,
    BrowserMultiFormatReader,
    NotFoundException
  } from '@zxing/library'

  // 公式サンプルから拝借
  // https://github.com/zxing-js/library#usage
  // https://github.com/zxing-js/library/blob/master/docs/examples/multi-camera/index.html
  const hints = new Map()
  const formats = [BarcodeFormat.CODE_128, BarcodeFormat.DATA_MATRIX]
  hints.set(DecodeHintType.POSSIBLE_FORMATS, formats)
  const codeReader = new BrowserMultiFormatReader(hints)
  codeReader.listVideoInputDevices()
    .then((videoInputDevices) => {
      const sourceSelect = document.getElementById('sourceSelect')
      let selectedDeviceId = videoInputDevices[0].deviceId
      if (videoInputDevices.length >= 1) {
        videoInputDevices.forEach((element) => {
          const sourceOption = document.createElement('option')
          sourceOption.text = element.label
          sourceOption.value = element.deviceId
          sourceSelect.appendChild(sourceOption)
        })

        sourceSelect.onchange = () => {
          selectedDeviceId = sourceSelect.value
        }

        const sourceSelectPanel = document.getElementById('sourceSelectPanel')
        sourceSelectPanel.style.display = 'block'
      }

      document.getElementById('startButton').addEventListener('click', () => {
        codeReader.decodeFromVideoDevice(selectedDeviceId, 'video', (result, err) => {
          if (result) {
            console.log(result)
            document.getElementById('result').textContent = result.text
          }
          if (err && !(err instanceof NotFoundException)) {
            console.error(err)
            document.getElementById('result').textContent = err
          }
        })
        console.log(`Started continous decode from camera with id ${selectedDeviceId}`)
      })

      document.getElementById('resetButton').addEventListener('click', () => {
        codeReader.reset()
        document.getElementById('result').textContent = ''
        console.log('Reset.')
      })
    })
    .catch((err) => {
      console.error(err)
    })
</script>

<div>
  <h2 class="title">Scan 1D/2D Code from Video Camera</h2>

  <div>
    <button type="button" class="btn btn-primary" id="startButton">Start</button>
    <button type="button" class="btn btn-secondary" id="resetButton">Reset</button>
  </div>

  <div class="border">
    <video class="mw-100" id="video"></video>
  </div>

  <div id="sourceSelectPanel" style="display:none">
    <label for="sourceSelect">Change video source:</label>
    <select id="sourceSelect">
    </select>
  </div>

  <div>
    <label>Result: </label>
    <div class="alert alert-success" role="alert" id="result">
  </div>
  </div>
</div>

<style>
</style>

/**
 * This will be loaded before starting the simulator.
 * If you wish to add custom javascript, 
 * ** make sure to add this line to pxt.json**
 * 
 *      "disableTargetTemplateFiles": true
 * 
 * otherwise MakeCode will override your changes.
 * 
 * To register a constrol simmessages, use addSimMessageHandler
 */
addSimMessageHandler("web", (data) => {
    console.log('addSimMessageHandler')
    const targetWindow = window.parent
    console.log('window ', window)
    console.log('targetWindow ', targetWindow)
    targetWindow.postMessage(data, 'http://localhost:8080/fight_fiat')
})

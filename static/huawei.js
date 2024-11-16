import { Connection, Device, Monitoring } from 'huawei-lte-api';

const connection = new Connection('http://admin:aaxp93bb@192.168.8.1/');

connection.ready.then(() => {
  const device = new Device(connection);
  
  const monitor = new Monitoring(connection);
  //Needs valid authorization, will throw exception if invalid credentials are passed in URL
  monitor.monthStatistics().then((result) => {
    result.CurrentMonthDownGiga = Number(result.CurrentMonthDownload)/(1024*1024*1024);
    result.CurrentMonthUpGiga = Number(result.CurrentMonthUpload)/(1024*1024*1024);
    result.CurrentMonthGiga = result.CurrentMonthUpGiga + result.CurrentMonthDownGiga;
    result.CurrentMonthDownGiga = result.CurrentMonthDownGiga.toFixed(3);
    result.CurrentMonthUpGiga = result.CurrentMonthUpGiga.toFixed(3);
    result.CurrentMonthGiga = result.CurrentMonthGiga.toFixed(3); 
    console.log(result);
  }).catch((error) => {
    console.log(error);
  });
  
  /*
    //Can be accessed without authorization
  device.signal().then((result) => {
    console.log(result);
  }).catch((error) => {
    console.log(error);
  });
  */
    
    /*
    //Needs valid authorization, will throw exception if invalid credentials are passed in URL
  device.information().then((result) => {
    console.log(result);
  }).catch((error) => {
    console.log(error);
  });
  */
    
    /*
    //Needs valid authorization, will throw exception if invalid credentials are passed in URL
  device.basicInformation().then((result) => {
    console.log(result);
  }).catch((error) => {
    console.log(error);
  });
  */
    
});

// For more API calls just look on code in the src/api folder, there is no separate DOC yet

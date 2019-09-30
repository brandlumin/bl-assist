let blToday = ()=>{
  let blDateToday = new Date();
  let blMM = ('0'+(blDateToday.getMonth()+1)).match(/\d{2}$/)[0];
  let blDD = ('0'+blDateToday.getDate()).match(/\d{2}$/)[0];
  let blYYYY = (blDateToday.getFullYear());
  return blMM+'-'+blDD+'-'+blYYYY;
};
$('#datepicker').attr('value', blToday);
$('#datepicker').datepicker({
  format: 'mm-dd-yyyy',
  todayBtn: 'linked',
  autoclose: true,
  todayHighlight: true,
  daysOfWeekDisabled: '0,0'
});
//# sourceMappingURL=site.js.map

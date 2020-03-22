interface GameReport {
  startTime: number;
  endTime: number;
}

interface ReportModel {
  mathGame?: GameReport;
  matchGame?: GameReport;
  memorizeGame?: GameReport;
}

export default ReportModel;

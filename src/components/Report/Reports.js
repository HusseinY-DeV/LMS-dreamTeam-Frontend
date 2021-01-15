import React, { useState, useEffect } from 'react'
import Drawer from '../../Drawer'
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles'
import { Pie } from 'react-chartjs-2';
import randomColor from 'randomcolor';
import AssessmentIcon from '@material-ui/icons/Assessment';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker, } from '@material-ui/pickers'
import { getAllSectionsNoPaginateApi } from '../Section/api/api';
import { allSectionsReportApi, oneSectionsReportApi } from './api/api';


const drawerWidth = 200;

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex'
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  select: {
    // margin: theme.spacing(1),
    marginBottom: -5,
    marginRight: 20,
    minWidth: 120,
  },
}))

const Reports = () => {
  const classes = useStyles()
  const [open, setOpen] = useState(true);

  const [reportChoice, setReportChoice] = useState(null);

  const [data, setData] = useState({});

  const [sectionId, setSectionId] = useState('');

  const [sections, setSections] = useState([]);

  const [showReport, setShowReport] = useState(false);

  const [selectedFromDate, setSelectedFromDate] = useState(null);
  const [from, setFrom] = useState(null);
  const [to, setTo] = useState(null);
  const [selectedToDate, setSelectedToDate] = useState(null);


  const generateSections = async () => {
    const data = await getAllSectionsNoPaginateApi();
    setSections(data);
  }

  const generateReport = async () => {
    const data = await allSectionsReportApi();
    const stats = [
      data[0].Absent,
      data[0].Late,
      data[0].Present,
    ]
    setData({
      labels: [
        'Absent',
        'Late',
        'Present'
      ],
      datasets: [{
        data: stats,
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56'
        ],
        hoverBackgroundColor: [
          '#FF63A9',
          '#36A2FF',
          '#FFCE6F'
        ]
      }]
    });
    setShowReport(true);
  }

  const handleSelectChange = async e => {
    setSectionId(e.target.value);
    setShowReport(true);
    const data = await oneSectionsReportApi(e.target.value, from, to);
    const stats = [
      data[0].Absent,
      data[0].Late,
      data[0].Present,
    ]
    setData({
      labels: [
        'Absent',
        'Late',
        'Present'
      ],
      datasets: [{
        data: stats,
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56'
        ],
        hoverBackgroundColor: [
          '#FF63A9',
          '#36A2FF',
          '#FFCE6F'
        ]
      }]
    });
  }
  const handleDateFromChange = async date => {
    setSelectedFromDate(date);
    let date1 = new Date(date);
    let month = date1.getMonth() + 1;
    let day = date1.getDate();
    if (month < 10) {
      month = '0' + month.toString();
    }
    if (day < 10) {
      day = '0' + day.toString();
    }
    setFrom(`${date1.getFullYear()}-${month}-${day}`);
    let fromDate = `${date1.getFullYear()}-${month}-${day}`;
    if (sectionId && to) {
      const data = await oneSectionsReportApi(sectionId, fromDate, to);
      const stats = [
        data[0].Absent,
        data[0].Late,
        data[0].Present,
      ]
      setData({
        labels: [
          'Absent',
          'Late',
          'Present'
        ],
        datasets: [{
          data: stats,
          backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56'
          ],
          hoverBackgroundColor: [
            '#FF63A9',
            '#36A2FF',
            '#FFCE6F'
          ]
        }]
      });
    }
  };


  const handleDateToChange = async date => {
    setSelectedToDate(date);
    let date2 = new Date(date);
    let month = date2.getMonth() + 1;
    let day = date2.getDate();
    if (month < 10) {
      month = '0' + month.toString();
    }
    if (day < 10) {
      day = '0' + day.toString();
    }
    setTo(`${date2.getFullYear()}-${month}-${day}`);
    let toDate = `${date2.getFullYear()}-${month}-${day}`;
    if (sectionId && from) {
      const data = await oneSectionsReportApi(sectionId, from, toDate);
      const stats = [
        data[0].Absent,
        data[0].Late,
        data[0].Present,
      ]
      setData({
        labels: [
          'Absent',
          'Late',
          'Present'
        ],
        datasets: [{
          data: stats,
          backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56'
          ],
          hoverBackgroundColor: [
            '#FF63A9',
            '#36A2FF',
            '#FFCE6F'
          ]
        }]
      });
    }
  };

  return (
    <div className={classes.container}>
      <Drawer view="Generate Reports" open={[open, setOpen]} />
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            style={{ marginBottom: "20px" }}
            variant="contained"
            color="primary"
            size="large"
            className={classes.button}
            startIcon={<AssessmentIcon />}
            onClick={() => {
              setShowReport(false);
              setSectionId(null);
              setReportChoice("sections");
              generateReport();
            }}
          >
            For All Sections
        </Button>

          <Button
            style={{ margin: "0 20px 20px 20px" }}
            variant="contained"
            color="primary"
            size="large"
            className={classes.button}
            startIcon={<AssessmentIcon />}
            onClick={() => {
              setReportChoice("section");
              setShowReport(false);
              generateSections();
            }}
          >
            For a Section
        </Button>
          <Button

            style={{ marginBottom: "20px" }}
            variant="contained"
            color="primary"
            size="large"
            className={classes.button}
            startIcon={<AssessmentIcon />}
            onClick={() => {
              setShowReport(false);
              setReportChoice("student");
              setSectionId(null);
            }}
          >
            For a Student
        </Button>
        </div>
        {reportChoice && reportChoice === "sections" && showReport && (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ display: 'flex', width: 600, justifyContent: 'center' }}>
              <Pie data={data} />
            </div>
          </div>
        )}
        {reportChoice && reportChoice === "section" &&
          (<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <FormControl className={classes.select}>
                <InputLabel id="demo-simple-select-label">Section</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="section"
                  value={sectionId}
                  onChange={handleSelectChange}
                >
                  {sections.map((section, key) => (
                    <MenuItem key={key} value={section.id}>{section.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  disableToolbar
                  variant="inline"
                  format="MM/dd/yyyy"
                  margin="normal"
                  id="date-picker-inline"
                  maxDate={selectedToDate}
                  minDateMessage="From date should be before to date"
                  label="From"
                  style={{ marginRight: 20 }}
                  value={selectedFromDate}
                  onChange={handleDateFromChange}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
              </MuiPickersUtilsProvider>

              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  disableToolbar
                  variant="inline"
                  format="MM/dd/yyyy"
                  margin="normal"
                  id="date-picker-inline2"
                  minDate={selectedFromDate}
                  minDateMessage="To date should be after from date"
                  label="To"
                  value={selectedToDate}
                  onChange={handleDateToChange}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
              </MuiPickersUtilsProvider>
            </div>
            {showReport && (
              <div style={{ display: 'flex', width: 600, justifyContent: 'center' }}>
                <Pie data={data} />
              </div>
            )}
          </div>)}
        {reportChoice && reportChoice === "student" && (
          <p>Student</p>
        )}
      </main>
    </div>
  )
}

export default Reports

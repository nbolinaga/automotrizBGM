
import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import * as moment from 'moment';
moment.locale('es');

  week = [
    'Lunes',
    'Martes',
    'Miercoles',
    'Jueves',
    'Viernes',
    'Sabado',
    'Domingo'
  ];

  monthSelect: any[];
  dateSelect;
  dateValue;


  constructor( private data: DataService) { }

  ngOnInit(): void {
    this.getDaysFromDate(2, 2021);
  }

  getDaysFromDate(month: number, year: number): void {
    const startDate = moment(`${year}/${month}/01`);
    const endDate = startDate.clone().endOf('month');
    this.dateSelect = startDate;


  changeMonth(flag: number): void {
    if (flag < 0) {
      const prevDate = this.dateSelect.clone().subtract(1, 'month');
      this.getDaysFromDate(prevDate.format('MM'), prevDate.format('YYYY'));
    } else {
      const nextDate = this.dateSelect.clone().add(1, 'month');
      this.getDaysFromDate(nextDate.format('MM'), nextDate.format('YYYY'));
    }
  }


  clickDay(day): void {
    const monthYear = this.dateSelect.format('YYYY-MM');
    const parse = `${monthYear}-${day.value}`;
    const objectDate = moment(parse);
    this.dateValue = objectDate;
    this.data.fechaCitas = this.dateValue;
  }

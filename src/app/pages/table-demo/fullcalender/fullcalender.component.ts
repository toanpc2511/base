import { CalendarOptions, EventInput } from '@fullcalendar/core';
import {
  ApplicationRef,
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  ElementRef,
  Injector,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { DestroyService } from 'src/app/shared/services/destroy.service';

import { NgbModal, NgbPopover, NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import interactionPlugin from '@fullcalendar/interaction';

@Component({
  template: `
    <div
      ngbPopover]="popoverTemplate"
      popoverClass="shift-detail-popover"
      triggers="focus"
      container="body"
      autoClose="outside"
    >
      <div class="event-container">
        <div class="month-title">
          <span class="text-warning star" *ngIf="eventData.extendedProps.change"
            ><em class="fas fa-user-tag"></em>
          </span>
          <span class=""> {{ eventData.title }}</span>
        </div>
        <div class="week-title">
          <span class="text-warning star" *ngIf="eventData.extendedProps.change"
            ><em class="fas fa-user-tag"></em>
          </span>
          <span>{{ eventData.extendedProps.weekTitle }}</span>
        </div>
        <span class="week-content">{{ eventData.extendedProps.weekContent }}</span>
      </div>
    </div>
  `,
  styleUrls: ['event-wrapper.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [DestroyService]
})
export class EventWrapperComponent {
  popoverTemplate: TemplateRef<any>;
  eventData: EventInput;
  event: any;

  @ViewChild(NgbPopover, { static: true }) popover: NgbPopover;
  constructor(public elRef: ElementRef) {}
}

@Component({
  template: `
    <div class="day-cell-custom">
      <div class="cell-custom">
        <strong
          (click)="showDetailWarning()"
          *ngIf="tooltipWarning"
          tooltipClass="warning-tooltip"
          triggers="hover"
          container="body"
          class="warning-icon fa fa-exclamation-triangle mt-1 text-danger"
        ></strong>
      </div>
      <ng-content></ng-content>
    </div>
  `,
  styleUrls: ['day-wrapper.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [DestroyService]
})
export class DayWrapperComponent implements OnInit {
  tooltipWarning: string;
  currentDate: string;
  stationId: string;
  @ViewChild(NgbTooltip, { static: true }) tooltip: NgbTooltip;

  constructor(private ngbModal: NgbModal, private destroy$: DestroyService) {}
  ngOnInit(): void {
    this.tooltipWarning = 'Trạm có ca chưa được gán nhân viên';
  }

  showDetailWarning() {
    alert('Xin chao');
  }
}

@Component({
  selector: 'app-fullcalender',
  templateUrl: './fullcalender.component.html',
  styleUrls: ['./fullcalender.component.scss']
})
export class FullcalenderComponent implements OnInit {
  eventContainersMap = new Map<any, ComponentRef<EventWrapperComponent>>();
  calendarOptions: CalendarOptions = {
    headerToolbar: {
      left: 'prev,today,next',
      center: 'title',
      right: 'dayGridMonth,dayGridWeek,dayGridDay'
    },
    initialView: 'dayGridMonth',
    droppable: false, // this allows things to be dropped onto the calendar

    plugins: [interactionPlugin],
    editable: true,
    eventResizableFromStart: true,
    navLinks: false,
    locale: 'vi',
    buttonText: {
      today: 'Hôm nay',
      month: 'Tháng',
      week: 'Tuần',
      day: 'Ngày'
    },
    events: [
      {
        title: 'Docker compose',
        start: '2023-09-03',
        end: '2023-09-07',
        resourceEditable: true
      },
      { title: 'event 2', date: '2023-09-09T08:30' },
      { title: 'event 2', date: '2023-09-10' },
      { title: 'event 2', date: '2023-09-10' },
      { title: 'Working', start: '2023-09-11T08:30', end: '2023-09-12T11:15' }
    ],
    views: {
      dayGridMonth: {
        titleFormat: {
          year: 'numeric',
          month: '2-digit'
        },
        dayHeaderFormat: {
          weekday: 'long'
        },
        dayMaxEventRows: 3,
        dayMaxEvents: 2,
        moreLinkText: 'see more..',
        // moreLinkClick: this.showMore.bind(this),
        moreLinkClassNames: 'show-more',
        viewClassNames: 'month-view-type'
      },
      dayGridWeek: {
        titleFormat: { year: 'numeric', month: 'long', day: 'numeric' },
        dayHeaderFormat: {
          day: '2-digit',
          month: 'short',
          weekday: 'long'
        },
        viewClassNames: 'week-view-type'
      }
    },
    themeSystem: 'bootstrap',
    fixedWeekCount: false,
    allDaySlot: true,
    firstDay: 1,
    dayCellClassNames: 'day',
    eventClassNames: 'event',
    dayPopoverFormat: {
      weekday: 'long',
      day: '2-digit',
      month: 'numeric',
      year: 'numeric'
    },
    height: 700,
    // eventDidMount: this.renderEventContainer.bind(this),
    // eventWillUnmount: this.destroyEventContainer.bind(this),
    eventClick: this.popoverShowOrHide.bind(this),
    // dayCellDidMount: this.dayCellRender.bind(this),
    // dayCellWillUnmount: this.destroyDayCell.bind(this),
    // viewDidMount: this.viewDidMount.bind(this),
    dayHeaders: true,
    handleWindowResize: true,
    timeZone: globalTimeZone,
    nextDayThreshold: '00:00:00'
  };

  @ViewChild('popoverTmpl', { static: true }) popoverTmpl: TemplateRef<any>;
  eventContainerFactory = this.resolver.resolveComponentFactory(EventWrapperComponent);
  dayWrappersMap = new Map<any, ComponentRef<DayWrapperComponent>>();
  constructor(
    private appRef: ApplicationRef,
    private resolver: ComponentFactoryResolver,
    private injector: Injector
  ) {}

  ngOnInit(): void {}

  popoverShowOrHide(event: any) {
    const eventContainer = this.eventContainersMap.get(event.el);
    console.log(eventContainer);

    if (eventContainer) {
      const isShow = eventContainer.instance.popover.isOpen();
      if (!isShow) {
        eventContainer.instance.popover.open({ event });
      } else {
        eventContainer.instance.popover.close();
      }
    }
  }

  destroyDayCell(event) {
    const dayWrapper = this.eventContainersMap.get(event.el);
    if (dayWrapper) {
      this.appRef.detachView(dayWrapper.hostView);
      dayWrapper.destroy();
      this.dayWrappersMap.delete(event.el);
    }
  }

  handleDateClick(arg) {
    alert('date click! ' + arg.dateStr);
  }

  // renderEventContainer(event: any) {
  //   const projectableNodes = Array.from(event.el.childNodes);
  //   const compWrapperRef = this.eventContainerFactory.create(
  //     this.injector,
  //     [projectableNodes],
  //     event.el
  //   );
  //   compWrapperRef.instance.popoverTemplate = this.popoverTmpl;
  //   compWrapperRef.instance.eventData = event.event;
  //   const eventRef = compWrapperRef.instance.elRef.nativeElement as HTMLElement;
  //   eventRef.style.backgroundColor = event.event.backgroundColor;
  //   eventRef.style.color = event.event.color;
  //   this.appRef.attachView(compWrapperRef.hostView);
  //   this.eventContainersMap.set(event.el, compWrapperRef);
  // }
}

export const globalTimeZone = 'Asia/Ho_Chi_Minh';

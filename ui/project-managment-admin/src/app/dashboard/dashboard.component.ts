import {Component, ComponentFactoryResolver, Injector, OnInit, ViewChild} from '@angular/core';
import {AddProjectComponent} from "./add-project-card/add-project.component";
import {MatDialog, MatSnackBar} from "@angular/material";
import {RenameTitleBarService} from "../services/rename-title-bar.service";
import {ProjectService} from "../services/project.service";
import {ProjectCard} from "../core/model/project-card";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {DialogOverviewExampleDialog} from "./add-project-dialog/add-project-dialog.component";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  @ViewChild('addNew') addProject: AddProjectComponent;

  projectList: ProjectCard[];
  data: number = 0;
  cols = 5;

  constructor(
    public dialog: MatDialog,
    private renameTitleBar: RenameTitleBarService,
    private projectService: ProjectService,
    private resolver: ComponentFactoryResolver,
    private injector: Injector,
    private breakpointObserver: BreakpointObserver,
    private snackBar: MatSnackBar) {


    breakpointObserver.observe([
      Breakpoints.XSmall,
    ]).subscribe(result => {
      if (result.matches) {
        this.cols = 1
      }
    });

    breakpointObserver.observe([
      Breakpoints.Small
    ]).subscribe(result => {
      if (result.matches) {
        this.cols = 2
      }
    });

    breakpointObserver.observe([
      Breakpoints.Medium
    ]).subscribe(result => {
      if (result.matches) {
        this.cols = 3
      }
    });

    breakpointObserver.observe([
      Breakpoints.Large
    ]).subscribe(result => {
      if (result.matches) {
        this.cols = 5
      }
    });

    breakpointObserver.observe([
      Breakpoints.XLarge
    ]).subscribe(result => {
      if (result.matches) {
        this.cols = 6
      }
    });
  }

  ngOnInit() {
    this.renameTitleBar.setTitle("Project Dashboard");
    this.projectList = this.projectService.getProjectList();

    console.log(this.projectList)
  }

  addNewProject() {
  }

  createDialog() {

    this.renameTitleBar.setTitle("Add Project");
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px',
      data: {name: "", description: ""}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.renameTitleBar.setTitle("Project Dashboard");

    });


    dialogRef.componentInstance.createClick.subscribe(next => {

      for (let entry of this.projectList) {
        if (entry.cardTitle === dialogRef.componentInstance.data.name) {
          dialogRef.componentInstance.duplicateProject = true;
          this.snackBar.open("Please choose different name", "Ok", {
            duration: 2000,
          }).onAction().subscribe((next) => this.snackBar.dismiss());
          return;
        }
      }


      this.projectList.push({
        id: 2,
        owner: "Lakindu",
        cardTitle: dialogRef.componentInstance.data.name,
        description: dialogRef.componentInstance.data.description,
      } as ProjectCard);
      this.addNewProject();
      this.snackBar.open("Project created", "Dismiss", {
        duration: 2000,
      }).onAction().subscribe((next) => this.snackBar.dismiss());


    });

  }

  onAddNewProjectClick() {
    this.createDialog()
  }

}




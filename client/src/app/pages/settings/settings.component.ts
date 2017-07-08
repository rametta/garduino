import { Component, OnInit } from '@angular/core';
import { AppService } from './../../app.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
	selector: 'app-settings-page',
	templateUrl: './settings.component.html',
	styleUrls: ['./settings.component.scss']
})
export class SettingsPageComponent implements OnInit {

	manualForm: FormGroup;

	constructor(
		public appService: AppService,
		private fb: FormBuilder
	) { }

	ngOnInit(): void {
		this.manualForm = this.fb.group({
			temperature: '',
			humidity: '',
			moisture: '',
			light: ''
		});
	}

	submitManualForm(): void {
		const temperature = this.manualForm.get('temperature').value;
		const humidity = this.manualForm.get('humidity').value;
		const moisture = this.manualForm.get('moisture').value;
		const light = this.manualForm.get('light').value;

		// this.appService.fakeGarden(temperature, humidity, moisture, light)
		// 	.first()
		// 	.subscribe();
	}

}

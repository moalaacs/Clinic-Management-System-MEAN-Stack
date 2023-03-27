import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PaymentService } from 'src/app/services/payment.service';
@Component({
  selector: 'app-payment-add',
  templateUrl: './payment-add.component.html',
  styleUrls: ['./payment-add.component.css'],
})
export class PaymentAddComponent {
  validationMessages = {
    id:{
      required: 'Invoice Id is required',
      pattern: 'Invoice Id must be a string.',
    },
    amount: {
      required: 'Amount is required.',
      pattern: 'Amount must be a number. ',
    },
    card_number: {
      required: 'Card number is required.',
    },
    exp_month: {
      required: 'Expiration month is required.',
      pattern: 'Expiration month must be a number.',
    },
    exp_year: {
      required: 'Expiration year is required.',
      pattern: 'Expiration year must be a number.',
    },
    cvc: {
      required: 'CVC is required.',
      pattern: 'medicine name should be a string.CVC must be a number. ',
    },
  };
  constructor(
    public paymentService: PaymentService,
    private builder: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private activatedRoute:ActivatedRoute
  ) {}

  paymentForm = this.builder.group({
    id: this.builder.control(
      '',
      Validators.compose([Validators.required, Validators.pattern(/^[0-9 -]+$/)])
    ),
    amount: this.builder.control(
      '',
      Validators.compose([Validators.required, Validators.pattern('^[0-9]*$')])
    ),
    card_number: this.builder.control(
      '',
      Validators.compose([Validators.required])
    ),
    exp_month: this.builder.control(
      '',
      Validators.compose([Validators.required, Validators.pattern('^[0-9]*$')])
    ),
    exp_year: this.builder.control(
      '',
      Validators.compose([Validators.required, Validators.pattern('^[0-9]*$')])
    ),
    cvc: this.builder.control(
      '',
      Validators.compose([Validators.required, Validators.pattern('^[0-9]*$')])
    ),
  });

  add() {
    if (this.paymentForm.valid) {
      this.activatedRoute.params.subscribe(()=>{
        this.paymentService
        .Pay(this.paymentForm.value,this.paymentForm.value.id!)
        .subscribe(() => {
          this.router.navigate(['']);
          this.toastr.success('Payment added successfully.');
        });
      })
    } else {
      this.toastr.warning('Please enter valid data.');
    }
  }
  goBack(): void {
    this.router.navigate(['']);
  }
}

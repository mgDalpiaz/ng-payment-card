import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { AbstractControl, ReactiveFormsModule } from '@angular/forms';

import { CreditCardComponent } from './credit-card.component';
import { ICardDetails } from '@cc-project/lib/domain/ICardDetails';
import { CardType } from '@cc-project/lib/domain/card-type';
import cardTypes from '@cc-project/lib/domain/card-types';

describe('CreditCardComponent', () => {
  let component: CreditCardComponent;
  let fixture: ComponentFixture<CreditCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [CreditCardComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreditCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should instantiate form', () => {
    expect(component.ccForm).toBeDefined();
  });

  describe('ccForm', () => {
    afterEach(() => {
      component.ccForm.reset();
    });

    describe('cardNumber control', () => {
      let ctrl: AbstractControl;

      beforeAll(() => {
        ctrl = component.ccForm.get('cardNumber');
      });

      afterEach(() => {
        ctrl.reset();
      });

      it('should be marked as invalid if contains null', () => {
        ctrl.setValue(null);

        expect(ctrl.valid).toBeFalsy();
        expect(ctrl.hasError('required')).toBeTruthy();
        expect(ctrl.hasError('checksum')).toBeTruthy();
      });

      it('should be marked as valid if contains value', () => {
        ctrl.setValue('5362427769465507');

        expect(ctrl.valid).toBeTruthy();
        expect(ctrl.hasError('required')).toBeFalsy();
      });

      it('should be marked as invalid if contains less than 12 digits', () => {
        ctrl.setValue('12345678901');

        expect(ctrl.valid).toBeFalsy();
        expect(ctrl.hasError('minlength')).toBeTruthy();
      });

      it('should be marked as invalid if contains more than 19 digits', () => {
        ctrl.setValue('12345678901234567891');

        expect(ctrl.valid).toBeFalsy();
        expect(ctrl.hasError('maxlength')).toBeTruthy();
      });

      it('should be marked as valid if contains between 12 and 19 digits', () => {
        ctrl.setValue('4831334173681875');

        expect(ctrl.valid).toBeTruthy();
        expect(ctrl.hasError('minlength')).toBeFalsy();
        expect(ctrl.hasError('maxlength')).toBeFalsy();
      });

      it('should be marked as invalid if contains alphabet characters', () => {
        ctrl.setValue('12345AB912345');

        expect(ctrl.valid).toBeFalsy();
        expect(ctrl.hasError('numbersOnly')).toBeTruthy();
      });

      it('should be marked as valid if contains numerical value', () => {
        ctrl.setValue('4485400695865889');

        expect(ctrl.valid).toBeTruthy();
        expect(ctrl.hasError('numbersOnly')).toBeFalsy();
      });

      it('should be marked as invalid if checksum is not valid', () => {
        ctrl.setValue('4539883773969761462');

        expect(ctrl.valid).toBeFalsy();
        expect(ctrl.hasError('checksum')).toBeTruthy();
      });

      it('should be marked as valid if checksum is valid', () => {
        ctrl.setValue('4556705413750101610');

        expect(ctrl.valid).toBeTruthy();
        expect(ctrl.hasError('checksum')).toBeFalsy();
      });
    });

    describe('cardHolder control', () => {
      let ctrl: AbstractControl;

      beforeAll(() => {
        ctrl = component.ccForm.get('cardHolder');
      });

      afterEach(() => {
        ctrl.reset();
      });

      it('should be marked as invalid if is empty', () => {
        ctrl.setValue(null);

        expect(ctrl.valid).toBeFalsy();
        expect(ctrl.hasError('required')).toBeTruthy();
      });

      it('should be marked as valid if is not empty', () => {
        ctrl.setValue('Donnie Jr Darko');

        expect(ctrl.valid).toBeTruthy();
        expect(ctrl.hasError('required')).toBeFalsy();
      });
    });

    describe('expirationDay control', () => {
      let ctrl: AbstractControl;

      beforeAll(() => {
        ctrl = component.ccForm.get('expirationDay');
      });

      afterEach(() => {
        ctrl.reset();
      });

      it('should be marked as invalid if is empty', () => {
        ctrl.setValue(null);

        expect(ctrl.valid).toBeFalsy();
        expect(ctrl.hasError('required')).toBeTruthy();
      });

      it('should be marked as valid if is not empty', () => {
        ctrl.setValue('03');

        expect(ctrl.valid).toBeTruthy();
      });

      it('should be marked as invalid if contains less than 2 characters', () => {
        ctrl.setValue('3');

        expect(ctrl.valid).toBeFalsy();
        expect(ctrl.hasError('minlength')).toBeTruthy();
      });

      it('should be marked as invalid if contains more than 2 characters', () => {
        ctrl.setValue('031');

        expect(ctrl.valid).toBeFalsy();
        expect(ctrl.hasError('maxlength')).toBeTruthy();
      });

      it('should be marked as valid if contains exactly 2 characters', () => {
        ctrl.setValue('03');

        expect(ctrl.valid).toBeTruthy();
        expect(ctrl.hasError('minlength')).toBeFalsy();
        expect(ctrl.hasError('maxlength')).toBeFalsy();
      });
    });

    describe('expirationMonth control', () => {
      let ctrl: AbstractControl;

      beforeAll(() => {
        ctrl = component.ccForm.get('expirationMonth');
      });

      afterEach(() => {
        ctrl.reset();
      });

      it('should be marked as invalid if is empty', () => {
        ctrl.setValue(null);

        expect(ctrl.valid).toBeFalsy();
        expect(ctrl.hasError('required')).toBeTruthy();
      });

      it('should be marked as valid if is not empty', () => {
        ctrl.setValue('03');

        expect(ctrl.valid).toBeTruthy();
      });

      it('should be marked as invalid if contains less than 2 characters', () => {
        ctrl.setValue('3');

        expect(ctrl.valid).toBeFalsy();
        expect(ctrl.hasError('minlength')).toBeTruthy();
      });

      it('should be marked as invalid if contains more than 2 characters', () => {
        ctrl.setValue('031');

        expect(ctrl.valid).toBeFalsy();
        expect(ctrl.hasError('maxlength')).toBeTruthy();
      });

      it('should be marked as valid if contains exactly 2 characters', () => {
        ctrl.setValue('03');

        expect(ctrl.valid).toBeTruthy();
        expect(ctrl.hasError('minlength')).toBeFalsy();
        expect(ctrl.hasError('maxlength')).toBeFalsy();
      });
    });

    describe('ccv control', () => {
      let ctrl: AbstractControl;

      beforeAll(() => {
        ctrl = component.ccForm.get('ccv');
      });

      afterEach(() => {
        ctrl.reset();
      });

      it('should be marked as invalid if is empty', () => {
        ctrl.setValue(null);

        expect(ctrl.valid).toBeFalsy();
        expect(ctrl.hasError('required')).toBeTruthy();
      });

      it('should be marked as valid if is not empty', () => {
        ctrl.setValue('123');

        expect(ctrl.valid).toBeTruthy();
      });

      it('should be marked as invalid if contains less than 3 characters', () => {
        ctrl.setValue('12');

        expect(ctrl.valid).toBeFalsy();
        expect(ctrl.hasError('minlength')).toBeTruthy();
      });

      it('should be marked as invalid if contains more than 4 characters', () => {
        ctrl.setValue('12345');

        expect(ctrl.valid).toBeFalsy();
        expect(ctrl.hasError('maxlength')).toBeTruthy();
      });

      it('should be marked as valid if contains exactly 3 or 4 characters', () => {
        ctrl.setValue('123');

        expect(ctrl.valid).toBeTruthy();
        expect(ctrl.hasError('minlength')).toBeFalsy();
        expect(ctrl.hasError('maxlength')).toBeFalsy();

        ctrl.setValue('1234');
        expect(ctrl.valid).toBeTruthy();
        expect(ctrl.hasError('minlength')).toBeFalsy();
        expect(ctrl.hasError('maxlength')).toBeFalsy();
      });

      it('should be marked as invalid if contains alphabet characters', () => {
        ctrl.setValue('12A3');

        expect(ctrl.valid).toBeFalsy();
        expect(ctrl.hasError('numbersOnly')).toBeTruthy();
      });

      it('should be marked as valid if contains digits only', () => {
        ctrl.setValue('1234');

        expect(ctrl.valid).toBeTruthy();
        expect(ctrl.hasError('numbersOnly')).toBeFalsy();
      });
    });
  });

  describe('emitSavedCard', () => {
    it(
      'should emit saved form',
      fakeAsync(() => {
        let result: ICardDetails;
        component.formSaved.subscribe((val: ICardDetails) => (result = val));
        const exampleCard: ICardDetails = {
          cardNumber: '123456789101',
          cardHolder: 'Donnie Darko',
          expirationDay: '05',
          expirationMonth: '123',
          ccv: 123,
        };
        component.ccForm.setValue(exampleCard);
        component.emitSavedCard();

        expect(result).toBeDefined();
        expect(result).toEqual(exampleCard);
      })
    );
  });

  describe('properties', () => {
    describe('ccNumMissingTxt', () => {
      afterEach(() => {
        component.ccNumMissingTxt = null;
      });

      it('should accept string value', () => {
        component.ccNumMissingTxt = 'Example text';

        expect(component.ccNumMissingTxt).toEqual('Example text');
      });

      it('should have default value', () => {
        expect(component.ccNumMissingTxt).toEqual('Card number is required');
      });
    });

    describe('ccNumTooShortTxt', () => {
      afterEach(() => {
        component.ccNumTooShortTxt = null;
      });

      it('should accept string value', () => {
        component.ccNumTooShortTxt = 'Example text';

        expect(component.ccNumTooShortTxt).toEqual('Example text');
      });

      it('should have default value', () => {
        expect(component.ccNumTooShortTxt).toEqual('Card number is too short');
      });
    });

    describe('ccNumTooLongTxt', () => {
      afterEach(() => {
        component.ccNumTooLongTxt = null;
      });

      it('should accept string value', () => {
        component.ccNumTooLongTxt = 'Example text';

        expect(component.ccNumTooLongTxt).toEqual('Example text');
      });

      it('should have default value', () => {
        expect(component.ccNumTooLongTxt).toEqual('Card number is too long');
      });
    });

    describe('ccNumContainsLettersTxt', () => {
      afterEach(() => {
        component.ccNumContainsLettersTxt = null;
      });

      it('should accept string value', () => {
        component.ccNumContainsLettersTxt = 'Example text';

        expect(component.ccNumContainsLettersTxt).toEqual('Example text');
      });

      it('should have default value', () => {
        expect(component.ccNumContainsLettersTxt).toEqual('Card number can contain digits only');
      });
    });

    describe('ccNumChecksumInvalidTxt', () => {
      afterEach(() => {
        component.ccNumChecksumInvalidTxt = null;
      });

      it('should accept string value', () => {
        component.ccNumChecksumInvalidTxt = 'Example text';

        expect(component.ccNumChecksumInvalidTxt).toEqual('Example text');
      });

      it('should have default value', () => {
        expect(component.ccNumChecksumInvalidTxt).toEqual('Provided card number is invalid');
      });
    });

    describe('ccNumChecksumInvalidTxt', () => {
      afterEach(() => {
        component.cardHolderMissingTxt = null;
      });

      it('should accept string value', () => {
        component.cardHolderMissingTxt = 'Example text';

        expect(component.cardHolderMissingTxt).toEqual('Example text');
      });

      it('should have default value', () => {
        expect(component.cardHolderMissingTxt).toEqual('Card holder name is required');
      });
    });

    describe('expirationDayMissingTxt', () => {
      afterEach(() => {
        component.expirationDayMissingTxt = null;
      });

      it('should accept string value', () => {
        component.expirationDayMissingTxt = 'Example text';

        expect(component.expirationDayMissingTxt).toEqual('Example text');
      });

      it('should have default value', () => {
        expect(component.expirationDayMissingTxt).toEqual('Expiration day is required');
      });
    });

    describe('expirationDayTooShortTxt', () => {
      afterEach(() => {
        component.expirationDayTooShortTxt = null;
      });

      it('should accept string value', () => {
        component.expirationDayTooShortTxt = 'Example text';

        expect(component.expirationDayTooShortTxt).toEqual('Example text');
      });

      it('should have default value', () => {
        expect(component.expirationDayTooShortTxt).toEqual('Expiration day is too short');
      });
    });

    describe('expirationDayTooLongTxt', () => {
      afterEach(() => {
        component.expirationDayTooLongTxt = null;
      });

      it('should accept string value', () => {
        component.expirationDayTooLongTxt = 'Example text';

        expect(component.expirationDayTooLongTxt).toEqual('Example text');
      });

      it('should have default value', () => {
        expect(component.expirationDayTooLongTxt).toEqual('Expiration day is too long');
      });
    });

    describe('expirationMonthMissingTxt', () => {
      afterEach(() => {
        component.expirationMonthMissingTxt = null;
      });

      it('should accept string value', () => {
        component.expirationMonthMissingTxt = 'Example text';

        expect(component.expirationMonthMissingTxt).toEqual('Example text');
      });

      it('should have default value', () => {
        expect(component.expirationMonthMissingTxt).toEqual('Expiration month is required');
      });
    });

    describe('expirationMonthTooShortTxt', () => {
      afterEach(() => {
        component.expirationMonthTooShortTxt = null;
      });

      it('should accept string value', () => {
        component.expirationMonthTooShortTxt = 'Example text';

        expect(component.expirationMonthTooShortTxt).toEqual('Example text');
      });

      it('should have default value', () => {
        expect(component.expirationMonthTooShortTxt).toEqual('Expiration month is too short');
      });
    });

    describe('expirationMonthTooLongTxt', () => {
      afterEach(() => {
        component.expirationMonthTooLongTxt = null;
      });

      it('should accept string value', () => {
        component.expirationMonthTooLongTxt = 'Example text';

        expect(component.expirationMonthTooLongTxt).toEqual('Example text');
      });

      it('should have default value', () => {
        expect(component.expirationMonthTooLongTxt).toEqual('Expiration month is too long');
      });
    });

    describe('ccvMissingTxt', () => {
      afterEach(() => {
        component.ccvMissingTxt = null;
      });

      it('should accept string value', () => {
        component.ccvMissingTxt = 'Example text';

        expect(component.ccvMissingTxt).toEqual('Example text');
      });

      it('should have default value', () => {
        expect(component.ccvMissingTxt).toEqual('CCV number is required');
      });
    });

    describe('ccvNumTooShortTxt', () => {
      afterEach(() => {
        component.ccvNumTooShortTxt = null;
      });

      it('should accept string value', () => {
        component.ccvNumTooShortTxt = 'Example text';

        expect(component.ccvNumTooShortTxt).toEqual('Example text');
      });

      it('should have default value', () => {
        expect(component.ccvNumTooShortTxt).toEqual('CCV number is too short');
      });
    });

    describe('ccvNumTooLongTxt', () => {
      afterEach(() => {
        component.ccvNumTooLongTxt = null;
      });

      it('should accept string value', () => {
        component.ccvNumTooLongTxt = 'Example text';

        expect(component.ccvNumTooLongTxt).toEqual('Example text');
      });

      it('should have default value', () => {
        expect(component.ccvNumTooLongTxt).toEqual('CCV number is too long');
      });
    });

    describe('ccvContainsLettersTxt', () => {
      afterEach(() => {
        component.ccvContainsLettersTxt = null;
      });

      it('should accept string value', () => {
        component.ccvContainsLettersTxt = 'Example text';

        expect(component.ccvContainsLettersTxt).toEqual('Example text');
      });

      it('should have default value', () => {
        expect(component.ccvContainsLettersTxt).toEqual('CCV number can contain digits only');
      });
    });

    describe('validateCCNum', () => {
      afterEach(() => {
        component.validateCCNum = null;
      });

      it('should accept boolean value', () => {
        component.validateCCNum = false;

        expect(component.validateCCNum).toBeFalsy();
      });

      it('should have default true value', () => {
        expect(component.validateCCNum).toBeTruthy();
      });
    });

    describe('validateCCNum', () => {
      afterEach(() => {
        component.validateCCNum = null;
      });

      it('should accept boolean value', () => {
        component.validateCCNum = false;

        expect(component.validateCCNum).toBeFalsy();
      });

      it('should have default true value', () => {
        expect(component.validateCCNum).toBeTruthy();
      });
    });

    describe('validateCardHolder', () => {
      afterEach(() => {
        component.validateCardHolder = null;
      });

      it('should accept boolean value', () => {
        component.validateCardHolder = false;

        expect(component.validateCardHolder).toBeFalsy();
      });

      it('should have default true value', () => {
        expect(component.validateCardHolder).toBeTruthy();
      });
    });

    describe('validateExpirationDay', () => {
      afterEach(() => {
        component.validateExpirationDay = null;
      });

      it('should accept boolean value', () => {
        component.validateExpirationDay = false;

        expect(component.validateExpirationDay).toBeFalsy();
      });

      it('should have default true value', () => {
        expect(component.validateExpirationDay).toBeTruthy();
      });
    });

    describe('validateExpirationMonth', () => {
      afterEach(() => {
        component.validateExpirationMonth = null;
      });

      it('should accept boolean value', () => {
        component.validateExpirationMonth = false;

        expect(component.validateExpirationMonth).toBeFalsy();
      });

      it('should have default true value', () => {
        expect(component.validateExpirationMonth).toBeTruthy();
      });
    });

    describe('validateCCV', () => {
      afterEach(() => {
        component.validateCCV = null;
      });

      it('should accept boolean value', () => {
        component.validateCCV = false;

        expect(component.validateCCV).toBeFalsy();
      });

      it('should have default true value', () => {
        expect(component.validateCCV).toBeTruthy();
      });
    });
  });

  describe('getCardType', () => {
    it('should detect AMERICAN_EXPRESS', () => {
      expect(component.getCardType(cardTypes, '377740327049504')).toBe(CardType.AMERICAN_EXPRESS);
      expect(component.getCardType(cardTypes, '372774294508668')).toBe(CardType.AMERICAN_EXPRESS);
    });

    it('should detect DINERS', () => {
      expect(component.getCardType(cardTypes, '36678417462141')).toBe(CardType.DINERS);
      expect(component.getCardType(cardTypes, '36122381051416')).toBe(CardType.DINERS);
    });

    it('should detect DINERS_CARTE_BLANCHE', () => {
      expect(component.getCardType(cardTypes, '30310723060882')).toBe(CardType.DINERS_CARTE_BLANCHE);
      expect(component.getCardType(cardTypes, '30105635125710')).toBe(CardType.DINERS_CARTE_BLANCHE);
    });

    it('should detect DISCOVER_CLUB ', () => {
      expect(component.getCardType(cardTypes, '6011611639813367')).toBe(CardType.DISCOVER_CLUB);
      expect(component.getCardType(cardTypes, '6011040601455298')).toBe(CardType.DISCOVER_CLUB);
    });

    it('should detect CHINA_UNIONPAY', () => {
      expect(component.getCardType(cardTypes, '6281620341037549')).toBe(CardType.CHINA_UNIONPAY);
      expect(component.getCardType(cardTypes, '6237083013714488')).toBe(CardType.CHINA_UNIONPAY);
    });

    it('should detect JCB', () => {
      expect(component.getCardType(cardTypes, '3569198543021504')).toBe(CardType.JCB);
      expect(component.getCardType(cardTypes, '3529500239872869')).toBe(CardType.JCB);
    });

    it('should detect LASER', () => {
      expect(component.getCardType(cardTypes, '6304611158942658')).toBe(CardType.LASER);
    });

    it('should detect MAESTRO', () => {
      expect(component.getCardType(cardTypes, '5053026275762086')).toBe(CardType.MAESTRO);
      expect(component.getCardType(cardTypes, '5030644144155643')).toBe(CardType.MAESTRO);
    });

    it('should detect MASTERCARD', () => {
      expect(component.getCardType(cardTypes, '5585800405742631')).toBe(CardType.MASTERCARD);
      expect(component.getCardType(cardTypes, '5579644035345946')).toBe(CardType.MASTERCARD);
    });

    it('should detect VISA_ELECTRON', () => {
      expect(component.getCardType(cardTypes, '4917907514666080')).toBe(CardType.VISA_ELECTRON);
      expect(component.getCardType(cardTypes, '4913961879483056')).toBe(CardType.VISA_ELECTRON);
    });

    it('should detect VISA', () => {
      expect(component.getCardType(cardTypes, '4539330631653907')).toBe(CardType.VISA);
      expect(component.getCardType(cardTypes, '4929975343720')).toBe(CardType.VISA);
    });

    it('should return null if no card type was detected', () => {
      expect(component.getCardType(cardTypes, '9139330631653907')).toBeNull();
      expect(component.getCardType(cardTypes, '993219975343720')).toBeNull();
    });
  });
});

const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { User, Category, Wallet, Currency } = require('../models/models')
const axios = require('axios');

class CurrencyController {
  constructor(currencyService) {
    this.currencyService = currencyService;
  }

  getExchangeRates = async (req, res, next) => {
    const userId = req.user.id
    const exchangeRates = await this.currencyService.getExchangeRates(userId)
    return res.json(exchangeRates);
  }


}

const getCorrectDateForCurrencyService = () => {
  const now = new Date();
  if (now.getHours() < 12) {
    now.setDate(now.getDate() - 1);
  }

  const day = String(now.getDate()).padStart(2, '0');
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const year = now.getFullYear();

  return `${day}.${month}.${year}`;
}

class PrivatCurrencyService {
  _apiUrl = "https://api.privatbank.ua/p24api/exchange_rates"


  getExchangeRate() { }

  async getExchangeRates(userId) {
    try {

      const [currencies, exchangeRates] = await Promise.all([
        Currency.findAll(),
        axios.get(this._apiUrl, { params: { date: getCorrectDateForCurrencyService() } })
      ]);

      const currencyMap = new Map(currencies.map(currency => [currency.id, currency]));
      const exchangeRateMap = new Map(exchangeRates.data.exchangeRate.map(rate => [rate.currency, rate]));

      Object.assign(exchangeRateMap.get("UAH"), {
        saleRate: 1
      })

      const { currencyId: userCurrencyId } = await User.findOne({ where: { id: userId } });
      const userCurrency = currencyMap.get(userCurrencyId);

      const userCurrencySaleRate = exchangeRateMap.get(userCurrency.code)?.saleRateNB;

      const result = currencies
        .filter(currency => exchangeRateMap.has(currency.code))
        .map(currency => {
          const rate = exchangeRateMap.get(currency.code);
          return { ...currency.get(), rate: userCurrencySaleRate / rate.saleRateNB };
        });

      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

}

module.exports = new CurrencyController(new PrivatCurrencyService())
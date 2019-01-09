export class CheckEmoticon {
  public static checkEmoticon(symbol: string): number {
    switch (symbol) {
      case ":)":
        return 1;

      case ":(":
        return 2;

      case ";)":
        return 3;

      case ":D":
      case ":d":
        return 4;

      case ";;)":
        return 5;

      case ">:D>":
        return 6;

      case ":-/":
      case ":/":
        return 7;

      case ":X":
      case ":x":
        return 8;

      case ':">':
        return 9;

      case ":P":
      case ":p":
      case ":-P":
      case ":-p":
        return 10;

      case ":-*":
      case ":*":
        return 11;

      case "=((":
        return 12;

      case ":-O":
      case ":-o":
      case ":-0":
        return 13;

      case "x(":
      case "X(":
        return 14;

      case ":>":
        return 15;

      case "B-)":
        return 16;

      case ":-s":
      case ":-S":
        return 17;

      case "#:-S":
      case "#:-s":
        return 18;

      case ">:)":
        return 19;

      case ":((":
        return 20;

      case ":))":
        return 21;

      case ":|":
        return 22;

      case "/:)":
        return 23;

      case "=))":
        return 24;

      case "O:-)":
        return 25;

      case ":-B":
        return 26;

      case "=;":
        return 27;

      case ":-c":
        return 28;

      case ":)]":
        return 29;

      case "~X(":
        return 30;
    }

    return 0;
  }
}

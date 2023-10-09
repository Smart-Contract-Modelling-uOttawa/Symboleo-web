export const symboleoLanguage = {
    defaultToken: 'invalid',
    keywords: [
        'Domain', 'endDomain', 'Contract', 'Declarations', 'Obligation',
        'Preconditions', 'Postconditions', 'Obligations', 
        'Powers', 'Constraints', 'endContract', 'TimeGranularity', 'is',
        'Surviving', 'isA', 'isAn', 'Enumeration', 'with', 
        'Asset', 'Event','Role','Contract','Env','and','or','not',
        'Math.pow', 'Math.abs','Math.floor','Math.cbrt','Math.ceil',
        'Math.exp','Math.sign','Math.sqrt',
        'String.substring','String.replaceAll','String.concat', 
        'String.toLowerCase','String.toUpperCase','String.trimEnd',
        'String.trimStart','String.trim',
        'add', 'O', 'P', 'Suspended','obligations.','Exerted', 'Expired',
        'Resumed', 'Discharged', 'Terminated', 'Triggered', 'Activated', 'Fulfilled', 'Violated',
      'Happens', 'WhappensBefore', 'ShappensBefore', 'HappensWithin', 
      'WhappensBeforeE', 'ShappensBeforeE', 'HappensAfter', 'Occurs',
      'HappensAssign', 'Assign', 'IsEqual', 'IsOwner', 'CannotBeAssigned',
       'powers.', 'self',
       'FulfilledObligations','RevokedParty','AssignedParty', 'Rescinded',
    'Interval','Create','UnsuccessfulTermination','Active','InEffect','Suspension','SuccessfulTermination',
    'Create','Discharge','Active','InEffect','Suspension','Violation',
    'Fulfillment','UnsuccessfulTermination','Form',
    'UnAssign','InEffect','Suspension','Rescission','SuccessfulTermination',
    'UnsuccessfulTermination','Active', 'obligations', 'Power'
      ],
    
      typeKeywords: [
        'String', 'Date', 'Number', 'Boolean', 'seconds', 'minutes', 'hours', 'days', 'weeks', 'months', 'years'
      ],
    
      operators: [
        '=', '>', '<', '!', '~', '?', ':', '==', '<=', '>=', '!=',
        '&&', '||', '++', '--', '+', '-', '*', '/', '&', '|', '^', '%',
        '<<', '>>', '>>>', '+=', '-=', '*=', '/=', '&=', '|=', '^=',
        '%=', '<<=', '>>=', '>>>=', 'true', 'false'
      ],
    
      // we include these common regular expressions
      symbols:  /[=><!~?:&|+\-*\/\^%]+/,
    
      // C# style strings
      escapes: /\\(?:[abfnrtv\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,
    
      // The main tokenizer for our languages
      tokenizer: {
        root: [
          // identifiers and keywords
          [/[A-z_$][\w$]*/, { cases: { '@keywords': 'keyword',
                                        '@typeKeywords': 'keyword',
                                        '@operators': 'keyword',
                                       '@default': 'identifier' } }],
          [/[A-Z][\w\$]*/, 'type.identifier' ],  // to show class names nicely
    
          // whitespace
          { include: '@whitespace' },
    
          // delimiters and operators
          [/[{}()\[\]]/, '@brackets'],
          [/[<>](?!@symbols)/, '@brackets'],
          [/@symbols/, { cases: { '@operators': 'operator',
                                  '@default'  : '' } } ],
    
          // @ annotations.
          // As an example, we emit a debugging log message on these tokens.
          // Note: message are supressed during the first load -- change some lines to see them.
          [/@\s*[a-zA-Z_\$][\w\$]*/, { token: 'annotation', log: 'annotation token: $0' }],
    
          // numbers
          [/\d*\.\d+([eE][\-+]?\d+)?/, 'number.float'],
          [/0[xX][0-9a-fA-F]+/, 'number.hex'],
          [/\d+/, 'number'],
    
          // delimiter: after number because of .\d floats
          [/[;,.]/, 'delimiter'],
    
          // strings
          [/"([^"\\]|\\.)*$/, 'string.invalid' ],  // non-teminated string
          [/"/,  { token: 'string.quote', bracket: '@open', next: '@string' } ],
    
          // characters
          [/'[^\\']'/, 'string'],
          [/(')(@escapes)(')/, ['string','string.escape','string']],
          [/'/, 'string.invalid']
        ],
    
        comment: [
          [/[^\/*]+/, 'comment' ],
          [/\/\*/,    'comment', '@push' ],    // nested comment
          ["\\*/",    'comment', '@pop'  ],
          [/[\/*]/,   'comment' ]
        ],
    
        string: [
          [/[^\\"]+/,  'string'],
          [/@escapes/, 'string.escape'],
          [/\\./,      'string.escape.invalid'],
          [/"/,        { token: 'string.quote', bracket: '@close', next: '@pop' } ]
        ],
    
        whitespace: [
          [/[ \t\r\n]+/, 'white'],
          [/\/\*/,       'comment', '@comment' ],
          [/\/\/.*$/,    'comment'],
        ],
      },
}
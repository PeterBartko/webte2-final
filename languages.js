var dictionary = {
    'h1': {
        'en': 'Final assignment',
        'sk': 'Finálne zadanie'
    },
    'b1': {
        'en': 'API docs',
        'sk': 'API dokumentácia'
    },
    'b2': {
        'en': 'Send logs',
        'sk': 'Pošli logy'
    },
    'lab2': {
        'en': 'ANIMATION',
        'sk': 'animácia'
    },
    'lab3': {
        'en': 'GRAPH',
        'sk': 'GRAF'
    },
    'but': {
        'en': 'Calculate',
        'sk': 'Vypočítaj'
    },
    'butsub': {
        'en': 'Submit',
        'sk': 'Potvrď'
    },
    'names': {
        'en': 'Created By: ',
        'sk': 'Vytvorili: '
    },
    'h2':{
        'en': 'Octave calculator',
        'sk': 'Octave kalkulačka'
    }
};
var langs = ['en', 'sk'];
var current_lang_index = 0;
var current_lang = langs[current_lang_index];

window.change_lang_en = function() {
    current_lang_index = 0;
    current_lang = langs[current_lang_index];
    translate();
}
window.change_lang_sk = function() {
    current_lang_index = 1;
    current_lang = langs[current_lang_index];
    translate();
}

function translate() {
    $("[data-translate]").each(function(){
        var key = $(this).data('translate');
        $(this).html(dictionary[key][current_lang] || "N/A");
    });
}

translate();
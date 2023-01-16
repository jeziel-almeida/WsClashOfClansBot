const { isEmpty } = require('../utility');

module.exports = async (clash, parameters, command, prefix) => {
    if (isEmpty(parameters))
        return `Para o comando: _${command}_, você precisa digitar a tag, ex: _${prefix}player #29YJJR2UL_`;
    
    try {

        const playerResponse = await clash.playerByTag(`#${parameters[0].replace('#', '')}`);

        return (
            `*Detalhes do Player:*\n\n` +
            `    _${playerResponse.name} (${playerResponse.tag})_\n\n` +
            `    *Nível Centro de Vila:* ${playerResponse.townHallLevel}\n` +
            
            (
                isEmpty(playerResponse.builderHallLevel)
                    ? ``
                    : `    *Nível Casa do Construtor:* ${playerResponse.builderHallLevel}\n`
            ) +

            `    *Nível de Exp:* ${playerResponse.expLevel}\n\n` +

            (
                isEmpty(playerResponse.clan)
                    ? ``
                    : `    *Nome do Clã:* ${playerResponse.clan.name}\n` +
                    `    *Nível do Clã:* ${playerResponse.clan.clanLevel}\n` +
                    `    *Função:* ${playerResponse.role}\n\n`
            ) +

            (
                isEmpty(playerResponse.league)
                    ? ``
                    : `    *Liga:* ${playerResponse.league.name}\n`
            ) +

            `    *Troféus:* ${playerResponse.trophies}\n` +
            `    *Ataques Vencidos:* ${playerResponse.attackWins}\n` +
            `    *Defesas Vencidas:* ${playerResponse.defenseWins}\n\n` +
            `    *Troféus de Batalhas Simultâneas:* ${playerResponse.versusTrophies}\n` +
            `    *Vitórias de Batalhas Simultâneas:* ${playerResponse.versusBattleWins}\n` +
            `    *Tropas Doadas:* ${playerResponse.donations}\n` +
            `    *Tropas Recebidas:* ${playerResponse.donationsReceived}\n`
        );

    } catch (error) {
        let errorMessage;

        switch (error.statusCode) {
            case 404:
                errorMessage = `Player ${parameters[0]} não encontrado. Verifique se a tag está correta.`;
                break;
            default:
                errorMessage = `Algo deu errado com a requisição ${command}. Verifique se as informações estão corretas.`;
                console.log(error);
        }

        return errorMessage;
    }
    
}
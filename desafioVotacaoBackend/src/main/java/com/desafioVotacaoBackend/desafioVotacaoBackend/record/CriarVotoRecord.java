package com.desafioVotacaoBackend.desafioVotacaoBackend.record;

import com.desafioVotacaoBackend.desafioVotacaoBackend.model.Voto.VotoOpcao;

public record CriarVotoRecord(Long pautaId, Long associadoId, VotoOpcao opcao) {
}
